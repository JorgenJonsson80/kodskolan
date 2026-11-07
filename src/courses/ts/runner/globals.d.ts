// Det eleven når utöver JavaScript självt: samma låtsasversioner som i
// JS-kursen (se ../../js/runner/fakes.js). Hela lib.dom är 1,5 MB och
// skulle ge förslag på tusentals saker som övningarna aldrig använder.

interface Console {
  log(...data: any[]): void;
  info(...data: any[]): void;
  warn(...data: any[]): void;
  error(...data: any[]): void;
}
declare var console: Console;

declare function setTimeout(handler: () => void, timeout?: number): number;
declare function setInterval(handler: () => void, timeout?: number): number;
declare function clearTimeout(id: number | undefined): void;
declare function clearInterval(id: number | undefined): void;

interface Response {
  readonly ok: boolean;
  readonly status: number;
  json(): Promise<any>;
  text(): Promise<string>;
}
declare function fetch(url: string): Promise<Response>;

interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}
declare var localStorage: Storage;

// React-typerna utan lib.dom har tomma element. Formulären behöver värdet.
interface EventTarget {}
interface HTMLElement extends EventTarget {}
interface HTMLInputElement extends HTMLElement {
  value: string;
  checked: boolean;
}
interface HTMLTextAreaElement extends HTMLElement {
  value: string;
}
interface HTMLSelectElement extends HTMLElement {
  value: string;
}
interface HTMLButtonElement extends HTMLElement {}
interface HTMLFormElement extends HTMLElement {}
interface HTMLDivElement extends HTMLElement {}
