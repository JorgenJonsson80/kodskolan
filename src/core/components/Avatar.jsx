// Ritar figuren för en ålder i stages.js. Allt mäts från marken (GROUND)
// och uppåt, så att figuren växer när ben, kropp och huvud blir större.
const GROUND = 160;
const CX = 60;
const SKIN = '#f5c9a6';
const INK = '#1f2937';

function Hair({ type, color, cx, cy, r }) {
  const top = cy - r;
  if (type === 'tuft') {
    return (
      <path d={`M${cx - 2} ${top + 3} q2 -10 9 -8 q-6 2 -4 9`} fill={color} />
    );
  }

  const cap = `M${cx - r} ${cy - 1} A${r} ${r} 0 0 1 ${cx + r} ${cy - 1} Q${cx + r * 0.3} ${cy - r * 0.55} ${cx - r} ${cy - 1} Z`;
  if (type === 'spiky') {
    return (
      <g fill={color}>
        <path d={cap} />
        <path
          d={`M${cx - r * 0.8} ${top + 6} l3 -10 l5 8 l4 -11 l5 10 l4 -9 l3 11 Z`}
        />
      </g>
    );
  }
  return <path d={cap} fill={color} />;
}

function Extras({ extras, cx, cy, r, bodyTop, bodyBottom, bw }) {
  const has = name => extras.includes(name);
  const mouthY = cy + r * 0.45;
  const handY = bodyTop + (bodyBottom - bodyTop) * 0.75;

  return (
    <>
      {has('pacifier') && (
        <g>
          <circle cx={cx} cy={mouthY + 1} r={5} fill="#60a5fa" />
          <circle cx={cx} cy={mouthY + 1} r={2} fill="#bfdbfe" />
        </g>
      )}
      {has('teddy') && (
        <g transform={`translate(${cx + bw / 2 + 4} ${handY - 6})`}>
          <circle cx={-4} cy={-9} r={3} fill="#a16207" />
          <circle cx={4} cy={-9} r={3} fill="#a16207" />
          <circle cx={0} cy={-5} r={6} fill="#ca8a04" />
          <ellipse cx={0} cy={6} rx={7} ry={8} fill="#ca8a04" />
          <circle cx={-2} cy={-6} r={1} fill={INK} />
          <circle cx={2} cy={-6} r={1} fill={INK} />
        </g>
      )}
      {has('cap') && (
        <g fill="#ef4444">
          <path
            d={`M${cx - r} ${cy - 3} A${r} ${r} 0 0 1 ${cx + r} ${cy - 3} Z`}
          />
          <rect x={cx} y={cy - 5} width={r + 10} height={4} rx={2} />
        </g>
      )}
      {has('headphones') && (
        <g>
          <path
            d={`M${cx - r - 1} ${cy} A${r + 1} ${r + 2} 0 0 1 ${cx + r + 1} ${cy}`}
            fill="none"
            stroke="#334155"
            strokeWidth={4}
          />
          <rect
            x={cx - r - 5}
            y={cy - 6}
            width={8}
            height={13}
            rx={3}
            fill="#a78bfa"
          />
          <rect
            x={cx + r - 3}
            y={cy - 6}
            width={8}
            height={13}
            rx={3}
            fill="#a78bfa"
          />
        </g>
      )}
      {has('glasses') && (
        <g fill="none" stroke={INK} strokeWidth={1.6}>
          <circle cx={cx - r * 0.38} cy={cy + 1} r={5} />
          <circle cx={cx + r * 0.38} cy={cy + 1} r={5} />
          <path d={`M${cx - r * 0.38 + 5} ${cy + 1} h${r * 0.76 - 10}`} />
        </g>
      )}
      {has('beard') && (
        <path
          d={`M${cx - r * 0.8} ${cy + 4} Q${cx - r * 0.7} ${cy + r + 14} ${cx} ${cy + r + 16} Q${cx + r * 0.7} ${cy + r + 14} ${cx + r * 0.8} ${cy + 4} Q${cx} ${cy + r * 0.75} ${cx - r * 0.8} ${cy + 4} Z`}
          fill="#f1f5f9"
        />
      )}
      {has('wizardHat') && (
        <g>
          <path
            d={`M${cx - r - 6} ${cy - r * 0.55} L${cx + 6} ${cy - r - 34} L${cx + r + 6} ${cy - r * 0.55} Z`}
            fill="#6d28d9"
          />
          <rect
            x={cx - r - 8}
            y={cy - r * 0.6 - 3}
            width={2 * r + 16}
            height={6}
            rx={3}
            fill="#5b21b6"
          />
          <text x={cx - 4} y={cy - r - 6} fontSize={10} fill="#fde68a">
            ★
          </text>
        </g>
      )}
      {has('tie') && (
        <path d={`M${cx} ${bodyTop + 2} l-4 6 l4 20 l4 -20 Z`} fill="#dc2626" />
      )}
      {has('lanyard') && (
        <g>
          <path
            d={`M${cx - 7} ${bodyTop + 1} L${cx} ${bodyTop + 18} L${cx + 7} ${bodyTop + 1}`}
            fill="none"
            stroke="#1d4ed8"
            strokeWidth={2}
          />
          <rect
            x={cx - 6}
            y={bodyTop + 17}
            width={12}
            height={15}
            rx={2}
            fill="#f8fafc"
          />
          <rect
            x={cx - 4}
            y={bodyTop + 20}
            width={8}
            height={4}
            rx={1}
            fill="#93c5fd"
          />
        </g>
      )}
      {has('laptop') && (
        <g>
          <rect
            x={cx - 16}
            y={handY - 14}
            width={32}
            height={20}
            rx={2}
            fill="#cbd5e1"
          />
          <circle
            cx={cx}
            cy={handY - 4}
            r={3}
            fill="none"
            stroke="#38bdf8"
            strokeWidth={1.4}
          />
          <rect
            x={cx - 20}
            y={handY + 6}
            width={40}
            height={4}
            rx={2}
            fill="#94a3b8"
          />
        </g>
      )}
      {has('mug') && (
        <g transform={`translate(${cx + bw / 2 + 4} ${handY - 4})`}>
          <rect x={-5} y={0} width={10} height={11} rx={2} fill="#f8fafc" />
          <path
            d="M5 3 h3 a2 2 0 0 1 0 5 h-3"
            fill="none"
            stroke="#f8fafc"
            strokeWidth={1.5}
          />
          <path
            d="M-2 -3 q2 -3 0 -6 M2 -3 q2 -3 0 -6"
            stroke="#cbd5e1"
            fill="none"
          />
        </g>
      )}
    </>
  );
}

export default function Avatar({ stage, size = 160, silhouette = false }) {
  const { head: r, body, leg, shirt, pants, hair, extras } = stage;
  const hairColor = stage.hairColor ?? '#7c4a1e';
  const bw = r > 20 ? 28 : 32;
  const bodyBottom = GROUND - leg;
  const bodyTop = bodyBottom - body;
  const cy = bodyTop - r + 6;
  const shared = { cx: CX, cy, r, bodyTop, bodyBottom, bw };

  return (
    <svg
      className={silhouette ? 'avatar avatar-silhouette' : 'avatar'}
      viewBox="0 16 120 154"
      width={size}
      height={(size * 154) / 120}
      role="img"
      aria-label={
        silhouette ? `Nästa ålder: ${stage.title}` : `Din figur: ${stage.title}`
      }
    >
      <ellipse
        cx={CX}
        cy={GROUND + 2}
        rx={30}
        ry={5}
        fill="#000"
        opacity={0.25}
      />
      <g className="avatar-body">
        {extras.includes('backpack') && (
          <rect
            x={CX - bw / 2 - 8}
            y={bodyTop + 4}
            width={bw + 16}
            height={body - 4}
            rx={8}
            fill="#f59e0b"
          />
        )}
        <rect
          x={CX - 11}
          y={bodyBottom - 4}
          width={9}
          height={leg + 4}
          rx={4}
          fill={pants}
        />
        <rect
          x={CX + 2}
          y={bodyBottom - 4}
          width={9}
          height={leg + 4}
          rx={4}
          fill={pants}
        />
        <ellipse cx={CX - 7} cy={GROUND - 1} rx={7} ry={4} fill="#334155" />
        <ellipse cx={CX + 7} cy={GROUND - 1} rx={7} ry={4} fill="#334155" />
        <rect
          x={CX - bw / 2 - 7}
          y={bodyTop + 4}
          width={8}
          height={body * 0.72}
          rx={4}
          fill={shirt}
        />
        <rect
          x={CX + bw / 2 - 1}
          y={bodyTop + 4}
          width={8}
          height={body * 0.72}
          rx={4}
          fill={shirt}
        />
        <circle
          cx={CX - bw / 2 - 3}
          cy={bodyTop + 4 + body * 0.72}
          r={4}
          fill={SKIN}
        />
        <circle
          cx={CX + bw / 2 + 3}
          cy={bodyTop + 4 + body * 0.72}
          r={4}
          fill={SKIN}
        />
        <rect
          x={CX - bw / 2}
          y={bodyTop}
          width={bw}
          height={body + 2}
          rx={10}
          fill={shirt}
        />
        {extras.includes('backpack') && (
          <g stroke="#b45309" strokeWidth={3}>
            <path d={`M${CX - bw / 2 + 5} ${bodyTop + 2} v${body * 0.6}`} />
            <path d={`M${CX + bw / 2 - 5} ${bodyTop + 2} v${body * 0.6}`} />
          </g>
        )}
        <circle cx={CX - r} cy={cy + 2} r={4} fill={SKIN} />
        <circle cx={CX + r} cy={cy + 2} r={4} fill={SKIN} />
        <circle cx={CX} cy={cy} r={r} fill={SKIN} />
        <circle
          cx={CX - r * 0.38}
          cy={cy + 1}
          r={r > 20 ? 3 : 2.4}
          fill={INK}
        />
        <circle
          cx={CX + r * 0.38}
          cy={cy + 1}
          r={r > 20 ? 3 : 2.4}
          fill={INK}
        />
        <circle
          cx={CX - r * 0.6}
          cy={cy + r * 0.35}
          r={3}
          fill="#f87171"
          opacity={0.35}
        />
        <circle
          cx={CX + r * 0.6}
          cy={cy + r * 0.35}
          r={3}
          fill="#f87171"
          opacity={0.35}
        />
        <path
          d={`M${CX - 5} ${cy + r * 0.42} Q${CX} ${cy + r * 0.42 + 5} ${CX + 5} ${cy + r * 0.42}`}
          fill="none"
          stroke={INK}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <Hair type={hair} color={hairColor} cx={CX} cy={cy} r={r} />
        <Extras extras={extras} {...shared} />
      </g>
    </svg>
  );
}
