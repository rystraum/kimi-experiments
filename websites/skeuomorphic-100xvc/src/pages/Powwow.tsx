import { useMemo, useState } from 'react';
import AppShell from '../components/shell/AppShell';

/* ———————————————— data ———————————————— */

interface RowDef {
  num: string;
  name: string;
  caption: string;
  lane: number; // which of the 5 lanes its constellation occupies (0..4)
  stars: number; // rendered target nodes
  progress: number; // 0..1 — stars "in the black"
  to?: string;
}

const ROWS: RowDef[] = [
  { num: '01', name: 'Commit', caption: '04 targets · open', lane: 0, stars: 4, progress: 0.75, to: '/stacks/commit' },
  { num: '02', name: 'Build-to-Skill', caption: '07 targets · open', lane: 1, stars: 7, progress: 0.45, to: '/stacks/build-to-skill' },
  { num: '03', name: 'Credential', caption: '04 targets · open', lane: 2, stars: 4, progress: 0.25 },
  { num: '04', name: 'Distribute', caption: '04 targets · open', lane: 3, stars: 4, progress: 0.5 },
  { num: '05', name: 'Capitalize', caption: '06 targets · open', lane: 4, stars: 6, progress: 0.34 },
];

const LANES = ['A·01', 'B·02', 'C·03', 'D·04', 'E·05'];

const TOOLS = [
  { name: 'Powwow!', caption: 'Live every Thursday' },
  { name: 'P2P Learning', caption: 'Community of practice' },
  { name: 'Yodaman!', caption: 'Human + tech, at your service' },
  { name: 'Becoming', caption: 'The curriculum' },
];

/* attendance truth: 1 = attended (green), -1 = missed (red), 0 = upcoming (ink) */
const GRID: number[][] = [
  [1, 1, 1, -1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, -1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, -1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const CURRENT_WEEK = 6; // 1-based, peg highlights week 07 (index 6)

/* deterministic layout so the constellation never jitters */
function prand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const ROW_H = 118;

/** Plus-mark glyph — the map's node language. */
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

/* ———————————————— page ———————————————— */

export default function Powwow() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [svgW, setSvgW] = useState(0);

  const stars = useMemo(() => {
    if (svgW === 0) return ROWS.map(() => []);
    const laneW = svgW / 5;
    return ROWS.map((r, i) => {
      const rnd = prand(4242 + i * 999);
      const done = Math.round(r.stars * r.progress);
      const laneCx = (r.lane + 0.5) * laneW;
      return Array.from({ length: r.stars }, (_, k) => ({
        x: laneCx + (rnd() - 0.5) * laneW * 0.66,
        y: i * ROW_H + ROW_H / 2 + (rnd() - 0.5) * 56,
        hit: k < done,
      }));
    });
  }, [svgW]);

  const totals = GRID.flat().reduce(
    (acc, v) => {
      if (v === 1) acc.attended += 1;
      if (v === -1) acc.missed += 1;
      return acc;
    },
    { attended: 0, missed: 0 },
  );
  const targets = 25;

  return (
    <AppShell crumbs={[{ label: 'Home', to: '/' }, { label: 'Powwow!' }]}>
      <main className="px-5 pb-16 pt-7 sm:px-8">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-[40px] font-bold leading-none tracking-[-0.01em] sm:text-[50px]">
              Powwow!
            </h1>
            <p className="mt-3 max-w-[560px] font-serif text-[15px] leading-relaxed text-ink-55">
              The live system map — every stack, every target, every week of the expedition,
              plotted on one board. Green is attended, red is missed, ink is the road ahead.
            </p>
          </div>
          <div className="flex items-center gap-5 pb-1.5">
            <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink-70">
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-[hsl(var(--green))]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h6M6 3v6" /></svg>
              Attended
            </span>
            <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink-70">
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-[hsl(var(--destructive))]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h6M6 3v6" /></svg>
              Missed
            </span>
            <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink-70">
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-ink-55" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h6M6 3v6" /></svg>
              Upcoming
            </span>
          </div>
        </div>

        {/* ——— gameboard ——— */}
        <section className="mat-card mt-7 overflow-hidden rounded-[20px]">
          {/* lane header */}
          <div className="hairline-b grid" style={{ gridTemplateColumns: '200px repeat(5, 1fr)' }}>
            <div className="px-5 py-3 text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">Stacks</div>
            {LANES.map((l) => (
              <div key={l} className="border-l border-[hsl(var(--ink)/0.06)] px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-40">
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
                  <span className="mono mt-1 text-[9.5px] font-medium uppercase tracking-[0.06em] text-ink-40">{r.caption}</span>
                </button>
              ))}
            </div>

            {/* constellation field */}
            <div
              className="relative border-l border-[hsl(var(--ink)/0.06)]"
              ref={(el) => {
                if (el && el.clientWidth !== svgW) setSvgW(el.clientWidth);
              }}
            >
              {svgW > 0 && (
                <svg width={svgW} height={ROWS.length * ROW_H} className="block">
                  {/* lane separators */}
                  {[1, 2, 3, 4].map((k) => (
                    <line
                      key={k}
                      x1={(svgW / 5) * k}
                      y1={0}
                      x2={(svgW / 5) * k}
                      y2={ROWS.length * ROW_H}
                      stroke="hsl(var(--ink)/0.06)"
                      strokeWidth="1"
                    />
                  ))}
                  {/* row separators */}
                  {ROWS.slice(1).map((_, k) => (
                    <line
                      key={k}
                      x1={0}
                      y1={(k + 1) * ROW_H}
                      x2={svgW}
                      y2={(k + 1) * ROW_H}
                      stroke="hsl(var(--ink)/0.06)"
                      strokeWidth="1"
                    />
                  ))}

                  {ROWS.map((r, i) => {
                    const pts = stars[i];
                    const dim = hovered !== null && hovered !== i;
                    const hot = hovered === i;
                    return (
                      <g
                        key={r.num}
                        opacity={dim ? 0.25 : 1}
                        style={{ transition: 'opacity .3s' }}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => r.to && (window.location.href = r.to)}
                        className="cursor-pointer"
                      >
                        {/* row hit area */}
                        <rect x={0} y={i * ROW_H} width={svgW} height={ROW_H} fill="transparent" />
                        {/* edges between consecutive targets */}
                        {pts.slice(1).map((p, k) => (
                          <line
                            key={k}
                            x1={pts[k].x}
                            y1={pts[k].y}
                            x2={p.x}
                            y2={p.y}
                            stroke="hsl(var(--ink))"
                            strokeOpacity={hot ? 0.45 : 0.18}
                            strokeWidth={hot ? 1.4 : 1}
                            strokeDasharray={hot ? '4 5' : undefined}
                            className={hot ? 'dash-flow' : undefined}
                            style={{ transition: 'all .3s' }}
                          />
                        ))}
                        {/* target pluses */}
                        {pts.map((p, k) => (
                          <g key={k}>
                            {hot && p.hit && (
                              <circle cx={p.x} cy={p.y} r={12} fill="none" stroke="hsl(var(--green))" strokeOpacity="0.35" strokeWidth="1.5" />
                            )}
                            <Plus
                              x={p.x}
                              y={p.y}
                              s={hot ? (p.hit ? 15 : 12) : p.hit ? 12 : 9}
                              color={p.hit ? 'hsl(var(--green))' : 'hsl(var(--ink)/0.45)'}
                            />
                          </g>
                        ))}
                        {/* count label */}
                        <text
                          x={Math.min(Math.max(...pts.map((p) => p.x)) + 22, svgW - 78)}
                          y={pts[Math.floor(pts.length / 2)].y + 4}
                          className="mono"
                          fontSize="9.5"
                          fontWeight="600"
                          letterSpacing="0.08em"
                          fill="hsl(var(--ink)/0.45)"
                        >
                          {String(r.stars).padStart(2, '0')} TARGETS
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
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
                  <svg
                    viewBox="0 0 12 12"
                    className="h-3 w-3"
                    stroke={
                      v === 1
                        ? 'hsl(var(--green))'
                        : v === -1
                          ? 'hsl(var(--destructive))'
                          : 'hsl(var(--ink)/0.35)'
                    }
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  >
                    <path d="M3 6h6M6 3v6" />
                  </svg>
                </div>
              ))}
            </div>
          ))}

          {/* ledger */}
          <div className="hairline-t flex items-center gap-4 px-5 py-3.5">
            <span className="mono text-[11px] font-semibold text-ink-70">{targets} targets</span>
            <span className="text-ink-40">·</span>
            <span className="mono text-[11px] font-semibold text-[hsl(var(--green))]">{totals.attended} attended</span>
            <span className="text-ink-40">·</span>
            <span className="mono text-[11px] font-semibold text-[hsl(var(--destructive))]">{totals.missed} missed</span>
            <span className="text-ink-40">·</span>
            <span className="mono text-[11px] font-medium text-ink-55">Week {String(CURRENT_WEEK + 1).padStart(2, '0')}/16</span>
          </div>
        </section>

        <p className="mt-5 text-center font-serif text-[12.5px] italic text-ink-40">
          The map listens to the expedition — hover a stack to light its targets, open a row to
          enter its room.
        </p>
      </main>
    </AppShell>
  );
}
