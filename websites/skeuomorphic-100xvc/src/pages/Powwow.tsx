import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import AppShell from '../components/shell/AppShell';

/* ———————————————— data ———————————————— */

interface TargetDef {
  name: string; // the menu item this target points at
  to?: string;
}

interface RowDef {
  num: string;
  name: string;
  lane: number; // which of the 5 lanes its constellation occupies (0..4)
  targets: TargetDef[];
  progress: number; // 0..1 — targets "in the black"
  to?: string;
}

const ROWS: RowDef[] = [
  {
    num: '01', name: 'Commit', lane: 0, progress: 0.75, to: '/stacks/commit',
    targets: [
      { name: 'Calling Card', to: '/stacks/commit' },
      { name: 'Entry Card', to: '/stacks/commit' },
      { name: 'Session Card', to: '/stacks/commit' },
      { name: 'Expedition Card', to: '/stacks/commit' },
    ],
  },
  {
    num: '02', name: 'Build-to-Skill', lane: 1, progress: 0.45, to: '/stacks/build-to-skill',
    targets: [
      { name: 'Weekly Execution', to: '/stacks/weekly-execution' },
      { name: 'Ground Zero', to: '/stacks/ground-zero' },
      { name: 'Entry Microcosm', to: '/stacks/build-to-skill' },
      { name: 'Value Macrocosm', to: '/stacks/build-to-skill' },
      { name: 'Capture Economics', to: '/stacks/build-to-skill' },
      { name: 'Efficient Scale', to: '/stacks/build-to-skill' },
      { name: '100X ROI + Impact', to: '/stacks/build-to-skill' },
    ],
  },
  {
    num: '03', name: 'Credential', lane: 2, progress: 0.25,
    targets: [
      { name: 'Power Circle' },
      { name: 'Authentication' },
      { name: '100X Venture' },
      { name: 'Icon Class' },
    ],
  },
  {
    num: '04', name: 'Distribute', lane: 3, progress: 0.5,
    targets: [
      { name: 'Outbound Circulation' },
      { name: 'Inbound Circulation' },
      { name: 'Search for Fit' },
      { name: 'Network Capital' },
    ],
  },
  {
    num: '05', name: 'Capitalize', lane: 4, progress: 0.34,
    targets: [
      { name: 'Venture Capital' },
      { name: 'Icon Class Engagements' },
      { name: 'Power Revenue' },
      { name: 'Power Economics' },
      { name: 'End Game' },
      { name: '100X Wayfinding' },
    ],
  },
];

const LANES = ['A·01', 'B·02', 'C·03', 'D·04', 'E·05'];

const TOOLS = [
  { name: 'Powwow!', caption: 'Live every Thursday' },
  { name: 'P2P Learning', caption: 'Community of practice' },
  { name: 'Yodaman!', caption: 'Human + tech, at your service' },
  { name: 'Becoming', caption: 'The curriculum' },
];

/* attendance truth: 1 = attended (green star), -1 = missed (red dot), 0 = upcoming (ink plus) */
const GRID: number[][] = [
  [1, 1, 1, -1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, -1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, -1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const CURRENT_WEEK = 6; // 0-based index → week 07 highlighted

/* deterministic layout so the constellation never jitters between renders */
function prand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const ROW_H = 118;

interface Star {
  bx: number; by: number; // base position (centre of its wander)
  ax: number; ay: number; // drift amplitude
  wx: number; wy: number; // drift angular speed
  px: number; py: number; // drift phase
  hit: boolean;
}

/** Plus-mark glyph — the map's node language for open targets & the road ahead. */
function Plus({ x, y, s, color, opacity = 1 }: { x: number; y: number; s: number; color: string; opacity?: number }) {
  const a = s / 2;
  const c = s * 0.22;
  return (
    <g stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity={opacity}>
      <line x1={x - a} y1={y} x2={x - c} y2={y} />
      <line x1={x + c} y1={y} x2={x + a} y2={y} />
      <line x1={x} y1={y - a} x2={x} y2={y - c} />
      <line x1={x} y1={y + c} x2={x} y2={y + c} />
    </g>
  );
}

/** Five-point star — a target in the black: the constellation literally lights up. */
function StarGlyph({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  const R = s / 2;
  const r = R * 0.42;
  const pts = Array.from({ length: 10 }, (_, i) => {
    const rad = i % 2 === 0 ? R : r;
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    return `${(x + rad * Math.cos(ang)).toFixed(2)},${(y + rad * Math.sin(ang)).toFixed(2)}`;
  }).join(' ');
  return (
    <polygon
      points={pts}
      fill={color}
      fillOpacity="0.18"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  );
}

/* ———————————————— constellation field ————————————————
   Isolated so the drift loop re-renders only the svg, not the page. */

function Field({
  width,
  hovered,
  setHovered,
}: {
  width: number;
  hovered: number | null;
  setHovered: (n: number | null) => void;
}) {
  const navigate = useNavigate();
  const [tip, setTip] = useState<{ row: number; idx: number } | null>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      setT(now - t0);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const stars = useMemo<Star[][]>(() => {
    const laneW = width / 5;
    return ROWS.map((r, i) => {
      const rnd = prand(4242 + i * 999);
      const done = Math.round(r.targets.length * r.progress);
      const laneCx = (r.lane + 0.5) * laneW;
      return r.targets.map((_, k) => ({
        bx: laneCx + (rnd() - 0.5) * laneW * 0.66,
        by: i * ROW_H + ROW_H / 2 + (rnd() - 0.5) * 56,
        ax: 7 + rnd() * 10,
        ay: 5 + rnd() * 8,
        wx: 0.00022 + rnd() * 0.0002,
        wy: 0.00022 + rnd() * 0.0002,
        px: rnd() * Math.PI * 2,
        py: rnd() * Math.PI * 2,
        hit: k < done,
      }));
    });
  }, [width]);

  const pos = (s: Star) => ({
    x: s.bx + s.ax * Math.sin(s.wx * t + s.px),
    y: s.by + s.ay * Math.sin(s.wy * t + s.py),
  });

  return (
    <svg width={width} height={ROWS.length * ROW_H} className="block">
      {/* row separators — no column lines; lanes are implied by the constellations */}
      {ROWS.slice(1).map((_, k) => (
        <line
          key={k}
          x1={0}
          y1={(k + 1) * ROW_H}
          x2={width}
          y2={(k + 1) * ROW_H}
          stroke="hsl(var(--ink)/0.06)"
          strokeWidth="1"
        />
      ))}

      {ROWS.map((r, i) => {
        const pts = stars[i].map(pos);
        const dim = hovered !== null && hovered !== i;
        const hot = hovered === i;
        return (
          <g
            key={r.num}
            opacity={dim ? 0.25 : 1}
            style={{ transition: 'opacity .3s' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => {
              setHovered(null);
              setTip(null);
            }}
            onClick={() => r.to && navigate(r.to)}
            className="cursor-pointer"
          >
            {/* row hit area */}
            <rect x={0} y={i * ROW_H} width={width} height={ROW_H} fill="transparent" />
            {/* edges between consecutive targets — they ride the drift */}
            {pts.slice(1).map((p, k) => (
              <line
                key={k}
                x1={pts[k].x}
                y1={pts[k].y}
                x2={p.x}
                y2={p.y}
                className={hot ? 'dash-flow' : undefined}
                style={{
                  stroke: 'hsl(var(--ink))',
                  strokeOpacity: hot ? 0.45 : 0.18,
                  strokeWidth: hot ? 1.4 : 1,
                  strokeDasharray: hot ? '4 5' : 'none',
                  transition: 'stroke-opacity .3s, stroke-width .3s',
                }}
              />
            ))}
            {/* target marks — each names its menu item on hover */}
            {pts.map((p, k) => {
              const tipped = tip?.row === i && tip?.idx === k;
              const hit = stars[i][k].hit;
              const label = r.targets[k].name.toUpperCase();
              const est = label.length * 6.3 + 10;
              const flip = p.x + 14 + est > width - 4;
              return (
                <g
                  key={k}
                  onMouseEnter={() => setTip({ row: i, idx: k })}
                  onMouseLeave={() => setTip(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    const dest = r.targets[k].to ?? r.to;
                    if (dest) navigate(dest);
                  }}
                >
                  <circle cx={p.x} cy={p.y} r={15} fill="transparent" />
                  {hit && (hot || tipped) && (
                    <circle cx={p.x} cy={p.y} r={12} fill="none" stroke="hsl(var(--green))" strokeOpacity="0.35" strokeWidth="1.5" />
                  )}
                  {tipped && !hit && (
                    <circle cx={p.x} cy={p.y} r={12} fill="none" stroke="hsl(var(--ink))" strokeOpacity="0.22" strokeWidth="1.2" />
                  )}
                  {hit ? (
                    <StarGlyph
                      x={p.x}
                      y={p.y}
                      s={tipped || hot ? 16 : 13}
                      color="hsl(var(--green))"
                    />
                  ) : (
                    <Plus
                      x={p.x}
                      y={p.y}
                      s={tipped ? 15 : hot ? 12 : 9}
                      color={tipped ? 'hsl(var(--ink)/0.8)' : 'hsl(var(--ink)/0.45)'}
                    />
                  )}
                  {tipped && (
                    <text
                      x={flip ? p.x - 14 : p.x + 14}
                      y={p.y + 3.5}
                      textAnchor={flip ? 'end' : 'start'}
                      className="mono"
                      fontSize="9.5"
                      fontWeight="600"
                      letterSpacing="0.08em"
                      fill="hsl(var(--ink))"
                      stroke="hsl(var(--paper))"
                      strokeWidth="3.5"
                      paintOrder="stroke"
                    >
                      {label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ———————————————— page ———————————————— */

export default function Powwow() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [svgW, setSvgW] = useState(0);

  const totals = GRID.flat().reduce(
    (acc, v) => {
      if (v === 1) acc.attended += 1;
      if (v === -1) acc.missed += 1;
      return acc;
    },
    { attended: 0, missed: 0 },
  );

  return (
    <AppShell crumbs={[{ label: 'Home', to: '/' }, { label: 'Powwow!' }]}>
      <main className="px-5 pb-16 pt-7 sm:px-8">
        {/* header */}
        <div>
          <h1 className="font-display text-[40px] font-bold leading-none tracking-[-0.01em] sm:text-[50px]">
            Powwow!
          </h1>
          <p className="mt-3 max-w-[560px] font-serif text-[15px] leading-relaxed text-ink-55">
            The live system map — every stack, every target, every week of the expedition,
            plotted on one board. Green is attended, red is missed, ink is the road ahead.
          </p>
        </div>

        {/* ——— gameboard ——— */}
        <section className="mat-card mt-7 overflow-hidden rounded-[20px]">
          {/* lane header */}
          <div className="hairline-b grid" style={{ gridTemplateColumns: '200px repeat(5, 1fr)' }}>
            <div className="px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">Stacks</div>
            {LANES.map((l) => (
              <div key={l} className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-40">
                {l}
              </div>
            ))}
          </div>

          <div className="grid" style={{ gridTemplateColumns: '200px 1fr' }}>
            {/* row labels */}
            <div className="flex flex-col">
              {ROWS.map((r, i) => (
                <button
                  key={r.num}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => r.to && (window.location.href = r.to)}
                  className={`flex flex-col justify-center border-b border-[hsl(var(--ink)/0.06)] px-5 text-left transition-colors last:border-b-0 ${
                    hovered === i ? 'bg-[hsl(var(--tint)/0.5)]' : ''
                  }`}
                  style={{ height: ROW_H }}
                >
                  <span className="mono text-[10px] font-semibold text-ink-40">{r.num}</span>
                  <span className="mt-0.5 text-[15px] font-bold uppercase tracking-[0.03em]">{r.name}</span>
                </button>
              ))}
            </div>

            {/* constellation field */}
            <div
              ref={(el) => {
                if (el && el.clientWidth !== svgW) setSvgW(el.clientWidth);
              }}
            >
              {svgW > 0 && <Field width={svgW} hovered={hovered} setHovered={setHovered} />}
            </div>
          </div>
        </section>

        {/* ——— tools × 16 weeks ——— */}
        <section className="mat-card mt-6 overflow-hidden rounded-[20px]">
          <div className="hairline-b grid" style={{ gridTemplateColumns: '200px repeat(16, 1fr)' }}>
            <div className="px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">
              Tools · 16 weeks
            </div>
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className={`border-l border-[hsl(var(--ink)/0.06)] py-3 text-center text-[9.5px] font-semibold ${
                  i === CURRENT_WEEK ? 'bg-[hsl(var(--ink))] text-white' : 'text-ink-40'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>

          {TOOLS.map((t, ti) => (
            <div key={t.name} className="grid border-b border-[hsl(var(--ink)/0.06)] last:border-b-0" style={{ gridTemplateColumns: '200px repeat(16, 1fr)' }}>
              <div className="px-5 py-3.5">
                <p className="text-[13px] font-bold uppercase tracking-[0.03em]">{t.name}</p>
                <p className="mt-0.5 text-[10px] leading-snug text-ink-40">{t.caption}</p>
              </div>
              {GRID[ti].map((v, wi) => (
                <div
                  key={wi}
                  className={`flex items-center justify-center border-l border-[hsl(var(--ink)/0.06)] ${
                    wi === CURRENT_WEEK ? 'bg-[hsl(var(--tint)/0.7)]' : ''
                  }`}
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
                    {v === 1 ? (
                      /* attended — a green star */
                      <path
                        d="M6 1.4 7.14 4.44 10.37 4.58 7.84 6.6 8.7 9.72 6 7.93 3.3 9.72 4.16 6.6 1.63 4.58 4.86 4.44Z"
                        fill="hsl(var(--green))"
                        stroke="hsl(var(--green))"
                        strokeWidth="0.8"
                        strokeLinejoin="round"
                      />
                    ) : v === -1 ? (
                      /* missed — a red dot */
                      <circle cx="6" cy="6" r="2.5" fill="hsl(var(--destructive))" />
                    ) : (
                      /* upcoming — an ink plus */
                      <path
                        d="M3 6h6M6 3v6"
                        stroke="hsl(var(--ink)/0.35)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </div>
              ))}
            </div>
          ))}

          {/* ledger */}
          <div className="hairline-t flex items-center gap-4 px-5 py-3.5">
            <span className="mono text-[11px] font-semibold text-[hsl(var(--green))]">{totals.attended} attended</span>
            <span className="text-ink-40">·</span>
            <span className="mono text-[11px] font-semibold text-[hsl(var(--destructive))]">{totals.missed} missed</span>
            <span className="text-ink-40">·</span>
            <span className="mono text-[11px] font-medium text-ink-55">Week {String(CURRENT_WEEK + 1).padStart(2, '0')}/16</span>
          </div>
        </section>

        <p className="mt-5 text-center font-serif text-[12.5px] italic text-ink-40">
          The map listens to the expedition — hover a target to name its room, open one to go
          there.
        </p>
      </main>
    </AppShell>
  );
}
