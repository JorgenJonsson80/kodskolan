# Körs efter harness.py och FastAPI-kursens fastapi_harness.py (samma
# Pyodide). En låtsasversion av Anthropics Python-SDK: eleven skriver
# precis samma kod som mot det riktiga API:et (anthropic.Anthropic(),
# client.messages.create(...), content-block, stop_reason, tool_use …),
# men inga riktiga anrop görs. Svaren är förutsägbara, så att övningarna
# går att rätta, och de kostar ingenting.
#
# Hur låtsasmodellen svarar står i docs/kurser/ai.md. Kort:
#   1. Övningens regler (modell i övningen, filen .modell.json) går först.
#      En regel kan svara med text, json, ett verktygsanrop eller ett fel
#      (fel: 'RateLimitError'), högst ganger gånger.
#   2. Svar på verktygsresultat, minne av namn och enkel räkning.
#   3. Systemprompten styr stilen: pirat, kort, versaler, engelska.
#   4. Annars ett vänligt standardsvar.
import asyncio
import copy
import json
import os
import re
import sys
import types

MODELL_FIL = '.modell.json'
# Ett anrop tar en (låtsas)sekund. Tiden går bara i _LOOP, aldrig på riktigt.
SEKUNDER_PER_ANROP = 1.0

_ANROP = []
# Hur många gånger varje regel använts, för regler med 'ganger'.
_ANVANDA = {}
_RAKNARE = {'msg': 0, 'tool': 0}


def _nytt_id(sort):
    _RAKNARE[sort] += 1
    prefix = 'msg_' if sort == 'msg' else 'toolu_'
    return f'{prefix}{_RAKNARE[sort]:04d}'


# --- Typerna i svaret, med samma namn och fält som i SDK:t ---


class _Objekt:
    def __repr__(self):
        falt = ', '.join(f'{k}={v!r}' for k, v in self.__dict__.items() if not k.startswith('_'))
        return f'{type(self).__name__}({falt})'

    def model_dump(self):
        def dumpa(v):
            if isinstance(v, _Objekt):
                return v.model_dump()
            if isinstance(v, list):
                return [dumpa(x) for x in v]
            return v
        return {k: dumpa(v) for k, v in self.__dict__.items() if not k.startswith('_')}

    def __eq__(self, other):
        return isinstance(other, _Objekt) and self.model_dump() == other.model_dump()


class TextBlock(_Objekt):
    def __init__(self, text):
        self.type = 'text'
        self.text = text


class ToolUseBlock(_Objekt):
    def __init__(self, name, input):
        self.type = 'tool_use'
        self.id = _nytt_id('tool')
        self.name = name
        self.input = input


class Usage(_Objekt):
    def __init__(self, input_tokens, output_tokens):
        self.input_tokens = input_tokens
        self.output_tokens = output_tokens


class Message(_Objekt):
    def __init__(self, model, content, stop_reason, usage):
        self.id = _nytt_id('msg')
        self.type = 'message'
        self.role = 'assistant'
        self.model = model
        self.content = content
        self.stop_reason = stop_reason
        self.stop_sequence = None
        self.usage = usage


# --- Felen, som i SDK:t ---


class APIError(Exception):
    pass


class APIStatusError(APIError):
    status_code = 500

    def __init__(self, message):
        super().__init__(message)
        self.message = message


class BadRequestError(APIStatusError):
    status_code = 400


class AuthenticationError(APIStatusError):
    status_code = 401


class NotFoundError(APIStatusError):
    status_code = 404


class RateLimitError(APIStatusError):
    status_code = 429


class APIConnectionError(APIError):
    pass


# --- Hjälp för att läsa meddelanden ---


def _hamta(block, nyckel, standard=None):
    if isinstance(block, dict):
        return block.get(nyckel, standard)
    return getattr(block, nyckel, standard)


def _texten(content):
    """All text i ett meddelande, oavsett om content är en str eller block."""
    if isinstance(content, str):
        return content
    delar = []
    for block in content or []:
        if _hamta(block, 'type') == 'text':
            delar.append(_hamta(block, 'text', ''))
    return '\n'.join(delar)


def _verktygsresultat(content):
    if isinstance(content, str):
        return []
    return [b for b in content or [] if _hamta(b, 'type') == 'tool_result']


def _resultattext(resultat):
    innehall = _hamta(resultat, 'content', '')
    if isinstance(innehall, list):
        return _texten(innehall)
    return str(innehall)


def _tokens(text):
    # Förenklat: ett ord är ungefär en token. Riktiga modeller räknar
    # delar av ord, men storleksordningen blir rätt.
    return len(str(text).split())


def _systemtext(system):
    if system is None:
        return ''
    if isinstance(system, str):
        return system
    return _texten(system)


# --- Kontrollen av anropet, som det riktiga API:et gör ---


def _kontrollera(model, max_tokens, messages, tools):
    if not isinstance(model, str) or not model:
        raise BadRequestError('model: saknas. Skriv t.ex. model="claude-opus-5-5".')
    if not model.startswith('claude-'):
        raise NotFoundError(f'model: {model} finns inte. Modellerna heter t.ex. "claude-opus-5-5".')
    if not isinstance(max_tokens, int) or max_tokens < 1:
        raise BadRequestError('max_tokens: måste vara ett heltal större än 0.')
    if not isinstance(messages, list) or not messages:
        raise BadRequestError('messages: måste vara en lista med minst ett meddelande.')
    if _hamta(messages[0], 'role') != 'user':
        raise BadRequestError('messages: det första meddelandet måste ha role "user".')
    tool_ids = set()
    for i, meddelande in enumerate(messages):
        roll = _hamta(meddelande, 'role')
        if roll not in ('user', 'assistant'):
            raise BadRequestError(f'messages[{i}].role: måste vara "user" eller "assistant", inte {roll!r}.')
        innehall = _hamta(meddelande, 'content')
        if innehall is None or innehall == '' or innehall == []:
            raise BadRequestError(f'messages[{i}].content: får inte vara tomt.')
        if not isinstance(innehall, str):
            for block in innehall:
                if _hamta(block, 'type') == 'tool_use':
                    tool_ids.add(_hamta(block, 'id'))
                if _hamta(block, 'type') == 'tool_result' and _hamta(block, 'tool_use_id') not in tool_ids:
                    raise BadRequestError(
                        f'messages[{i}]: tool_result har tool_use_id {_hamta(block, "tool_use_id")!r}, '
                        'men inget tool_use-block med det id:t finns tidigare i samtalet.'
                    )
    for tool in tools or []:
        if 'name' not in tool or 'input_schema' not in tool:
            raise BadRequestError('tools: varje verktyg behöver name och input_schema.')


# --- Hur låtsasmodellen svarar ---


def _regler():
    try:
        with open(MODELL_FIL, encoding='utf-8') as fil:
            return json.load(fil)
    except (OSError, ValueError):
        return []


def _matchar(regel, fraga, system, historik, har_verktyg):
    if 'om' in regel and not re.search(regel['om'], fraga, re.IGNORECASE):
        return False
    if 'system' in regel and not re.search(regel['system'], system, re.IGNORECASE):
        return False
    if 'historik' in regel and not re.search(regel['historik'], historik, re.IGNORECASE):
        return False
    if regel.get('kraver_verktyg') and not har_verktyg:
        return False
    return True


def _stil(text, system):
    # Systemprompten styr hur svaret låter, som hos en riktig modell.
    s = system.lower()
    if 'engelska' in s or 'english' in s:
        text = _ENGELSKA.get(text, text)
    if 'pirat' in s:
        text = 'Arrr! ' + text
    if 'ett ord' in s:
        text = re.sub(r'[^\wåäöÅÄÖ-]', '', text.split()[0]) if text.split() else text
    elif 'kort' in s or 'en mening' in s:
        text = re.split(r'(?<=[.!?])\s', text)[0]
    if 'versaler' in s:
        text = text.upper()
    return text


_ENGELSKA = {
    'Hej! Hur kan jag hjälpa dig?': 'Hi! How can I help you?',
}


def _inbyggt_svar(fraga, historik_text):
    # Minnet finns bara i historiken som skickas med, precis som på riktigt.
    if re.search(r'vad heter jag', fraga, re.IGNORECASE):
        namn = re.findall(r'jag heter (\w+)', historik_text, re.IGNORECASE)
        return f'Du heter {namn[-1]}.' if namn else 'Det vet jag inte – du har inte berättat det.'
    rakning = re.search(r'(-?\d+(?:[.,]\d+)?)\s*([+\-*/])\s*(-?\d+(?:[.,]\d+)?)', fraga)
    if rakning:
        a, op, b = rakning.groups()
        a, b = float(a.replace(',', '.')), float(b.replace(',', '.'))
        if op == '/' and b == 0:
            return 'Det går inte att dela med noll.'
        svar = {'+': a + b, '-': a - b, '*': a * b, '/': a / b if b else 0}[op]
        svar = int(svar) if svar == int(svar) else round(svar, 4)
        return f'Det blir {svar}.'
    if re.fullmatch(r'\s*(hej|hejsan|tjena|hallå)[!. ]*', fraga, re.IGNORECASE):
        return 'Hej! Hur kan jag hjälpa dig?'
    return None


def _fyll(mall, fraga, resultat):
    return mall.replace('{fraga}', fraga).replace('{resultat}', resultat)


def _svara(model, max_tokens, system, messages, tools, schema):
    sista = messages[-1]
    fraga = _texten(_hamta(sista, 'content'))
    resultat = _verktygsresultat(_hamta(sista, 'content'))
    resultattext = '\n'.join(_resultattext(r) for r in resultat)
    systemtext = _systemtext(system)
    historik = '\n'.join(
        _texten(_hamta(m, 'content')) for m in messages if _hamta(m, 'role') == 'user'
    )
    har_verktyg = bool(tools)
    verktygsnamn = {t['name'] for t in tools or []}

    innehall = None
    for nummer, regel in enumerate(_regler()):
        if 'ganger' in regel and _ANVANDA.get(nummer, 0) >= regel['ganger']:
            continue
        if resultat and not regel.get('efter_verktyg'):
            continue
        if not resultat and regel.get('efter_verktyg'):
            continue
        if not _matchar(regel, fraga, systemtext, historik, har_verktyg):
            continue
        _ANVANDA[nummer] = _ANVANDA.get(nummer, 0) + 1
        if 'fel' in regel:
            # Som när API:et är överbelastat: övningar om omförsök.
            raise globals()[regel['fel']](regel.get('meddelande', 'För många anrop just nu. Försök igen.'))
        if 'verktyg' in regel:
            if regel['verktyg']['namn'] not in verktygsnamn:
                continue
            innehall = [ToolUseBlock(regel['verktyg']['namn'], copy.deepcopy(regel['verktyg'].get('input', {})))]
            if regel.get('svar'):
                innehall.insert(0, TextBlock(_fyll(regel['svar'], fraga, resultattext)))
        elif 'json' in regel:
            innehall = [TextBlock(json.dumps(regel['json'], ensure_ascii=False))]
        else:
            innehall = [TextBlock(_stil(_fyll(regel['svar'], fraga, resultattext), systemtext))]
        break

    if innehall is None and schema is not None:
        # Strukturerat svar utan regel: tomma värden av rätt typ.
        innehall = [TextBlock(json.dumps(_tomt_enligt(schema), ensure_ascii=False))]
    if innehall is None and resultat:
        innehall = [TextBlock(_stil(f'Enligt verktyget: {resultattext}', systemtext))]
    if innehall is None:
        svar = _inbyggt_svar(fraga, historik)
        if svar is None:
            svar = f'Jag är Kodskolans låtsasmodell. Du skrev: {fraga}'
        innehall = [TextBlock(_stil(svar, systemtext))]

    stop_reason = 'tool_use' if any(b.type == 'tool_use' for b in innehall) else 'end_turn'
    utdata = sum(_tokens(b.text) for b in innehall if b.type == 'text') + sum(
        _tokens(json.dumps(b.input)) + 5 for b in innehall if b.type == 'tool_use'
    )
    if utdata > max_tokens:
        # Som på riktigt: svaret klipps mitt i, och stop_reason säger varför.
        for block in innehall:
            if block.type == 'text':
                block.text = ' '.join(block.text.split()[:max_tokens])
        innehall = [b for b in innehall if b.type == 'text']
        stop_reason = 'max_tokens'
        utdata = max_tokens
    indata = _tokens(systemtext) + sum(
        _tokens(_texten(_hamta(m, 'content'))) + sum(
            _tokens(_resultattext(r)) for r in _verktygsresultat(_hamta(m, 'content'))
        )
        for m in messages
    ) + sum(_tokens(json.dumps(t)) for t in tools or [])
    return Message(model, innehall, stop_reason, Usage(indata, utdata))


def _tomt_enligt(schema):
    typ = schema.get('type')
    if typ == 'object':
        return {k: _tomt_enligt(v) for k, v in schema.get('properties', {}).items()}
    return {'string': '', 'integer': 0, 'number': 0, 'boolean': False, 'array': []}.get(typ)


def _schema_fran(output_config):
    if not output_config:
        return None
    format_ = output_config.get('format') or {}
    return format_.get('schema') if format_.get('type') == 'json_schema' else None


def _skapa(model=None, max_tokens=None, messages=None, system=None, tools=None,
           output_config=None, **ovrigt):
    _kontrollera(model, max_tokens, messages, tools)
    _ANROP.append({
        'model': model, 'max_tokens': max_tokens, 'system': system,
        'messages': _kopiera(messages), 'tools': _kopiera(tools),
        'output_config': _kopiera(output_config), **_kopiera(ovrigt),
    })
    return _svara(model, max_tokens, system, messages, tools, _schema_fran(output_config))


def _kopiera(varde):
    # Elevens historik innehåller våra block-objekt. Testerna ska kunna läsa
    # vad som skickades, även om eleven ändrar listan efteråt.
    if isinstance(varde, _Objekt):
        return varde.model_dump()
    if isinstance(varde, list):
        return [_kopiera(v) for v in varde]
    if isinstance(varde, dict):
        return {k: _kopiera(v) for k, v in varde.items()}
    return varde


def _tolka(svar, output_format):
    text = next(b.text for b in svar.content if b.type == 'text')
    svar.parsed_output = output_format.model_validate_json(text)
    return svar


class Messages:
    def create(self, **kwargs):
        _LOOP._now += SEKUNDER_PER_ANROP
        return _skapa(**kwargs)

    def parse(self, *, output_format, **kwargs):
        schema = output_format.model_json_schema()
        kwargs['output_config'] = {'format': {'type': 'json_schema', 'schema': schema}}
        return _tolka(self.create(**kwargs), output_format)


class AsyncMessages:
    async def create(self, **kwargs):
        await asyncio.sleep(SEKUNDER_PER_ANROP)
        return _skapa(**kwargs)

    async def parse(self, *, output_format, **kwargs):
        schema = output_format.model_json_schema()
        kwargs['output_config'] = {'format': {'type': 'json_schema', 'schema': schema}}
        return _tolka(await self.create(**kwargs), output_format)


class Anthropic:
    """Låtsasklienten. api_key behövs inte här, men går att skicka med."""

    def __init__(self, api_key=None, **kwargs):
        self.api_key = api_key or os.environ.get('ANTHROPIC_API_KEY')
        self.messages = Messages()


class AsyncAnthropic(Anthropic):
    def __init__(self, api_key=None, **kwargs):
        super().__init__(api_key, **kwargs)
        self.messages = AsyncMessages()


_modul = types.ModuleType('anthropic')
_modul.__doc__ = 'Kodskolans låtsasversion av Anthropics Python-SDK.'
for _namn, _varde in list(globals().items()):
    if _namn in (
        'Anthropic', 'AsyncAnthropic', 'Message', 'TextBlock', 'ToolUseBlock', 'Usage',
        'APIError', 'APIStatusError', 'BadRequestError', 'AuthenticationError',
        'NotFoundError', 'RateLimitError', 'APIConnectionError',
    ):
        setattr(_modul, _namn, _varde)
_typer = types.ModuleType('anthropic.types')
for _namn in ('Message', 'TextBlock', 'ToolUseBlock', 'Usage'):
    setattr(_typer, _namn, globals()[_namn])
_modul.types = _typer
sys.modules['anthropic'] = _modul
sys.modules['anthropic.types'] = _typer

# asyncio.run i elevens kod ska använda låtsastiden. Pyodides egen loop
# kan inte vänta klart.
asyncio.run = lambda coroutine, **kwargs: _LOOP.run(coroutine)


def _nollstall():
    _ANROP.clear()
    _ANVANDA.clear()
    _RAKNARE['msg'] = 0
    _RAKNARE['tool'] = 0


def _ai_helpers(namespace):
    def sekunder(funktion):
        start = _LOOP.time()
        funktion()
        return round(_LOOP.time() - start, 2)

    return {
        # Det eleven skickade till modellen, ett anrop per rad.
        '__anrop': lambda: _ANROP,
        '__sekunder': sekunder,
    }


TEST_GLOBALS.append(_ai_helpers)


def run_ai(code, tests_json, inputs_json, files_json, request_json=None):
    _nollstall()
    return run_fastapi(code, tests_json, inputs_json, files_json, request_json)
