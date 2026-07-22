import { useMemo } from 'react';

export interface MapPhase {
  id: string;
  num: string;
  name: string;
  count: number;
  locked?: boolean;
}

interface Props {
  phases: MapPhase[];
  activeId: string | null;
  progress: Record<string, number>; // 0..1
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

/* deterministic pseudo-random so the constellation never jitters */
function prand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const W = 340;
const ROW = 132;
const TOP = 92;

export default function OsMap({ phases, activeId, progress, onSelect, onHover }: Props) {
  const H = TOP * 2 + ROW * (phases.length - 1);

  const model = useMemo(() => {
    return phases.map((p, i) => {
      const cx = W / 2 + Math.sin(i * 1.35 + 0.6) * 52;
      const cy = TOP + i * ROW;
      const rnd = prand(1234 + i * 777);
      const subs = Array.from({ length: Math.min(p.count, 8) }, (_, k) => {
        const ang = (k / Math.min(p.count, 8)) * Math.PI * 2 + rnd() * 0.9;
        const rad = 46 + rnd() * 26;
        return { x: cx + Math.cos(ang) * rad, y: cy + Math.sin(ang) * rad * 0.82 };
      });
      return { ...p, cx, cy, subs };
    });
  }, [phases]);

  const spine = model
    .map((m, i) => `${i === 0 ? 'M' : 'L'} ${m.cx} ${m.cy}`)
    .join(' ');

  return (
    <div className="mat-card rounded-[24px] p-5">
      <div className="flex items-center justify-between px-1 pb-1">
        <span className="eyebrow">OS Map</span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink-55">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--blue))] opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--blue))]" />
          </span>
          Live
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full select-none" role="img" aria-label="100X OS phase map">
        <defs>
          {/* inner shadow — pressed-into-paper disc */}
          <filter id="disc-inset" x="-60%" y="-60%" width="220%" height="220%">
            <feOffset dx="0" dy="1.5" />
            <feGaussianBlur stdDeviation="1.5" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="#292456" floodOpacity="0.14" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
          <radialGradient id="disc-paper" cx="38%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f2ec" />
          </radialGradient>
          <radialGradient id="hub-blue" cx="35%" cy="25%" r="85%">
            <stop offset="0%" stopColor="#3f3fe8" />
            <stop offset="100%" stopColor="#1818c4" />
          </radialGradient>
        </defs>

        {/* spine */}
        <path d={spine} fill="none" stroke="hsl(248 42% 25% / 0.14)" strokeWidth="1.5" strokeDasharray="1 7" strokeLinecap="round" />

        {model.map((m) => {
          const active = activeId === m.id;
          const pct = Math.round((progress[m.id] ?? 0) * 100);
          const left = m.cx > W / 2;
          return (
            <g
              key={m.id}
              className="cursor-pointer"
              onClick={() => onSelect(m.id)}
              onMouseEnter={() => onHover(m.id)}
              onMouseLeave={() => onHover(null)}
            >
              {/* sub-constellation */}
              {m.subs.map((s, k) => (
                <g key={k}>
                  <line
                    x1={m.cx} y1={m.cy} x2={s.x} y2={s.y}
                    stroke={active ? 'hsl(240 79% 43% / 0.55)' : 'hsl(248 42% 25% / 0.12)'}
                    strokeWidth={active ? 1.4 : 1}
                    strokeDasharray={active ? '4 5' : undefined}
                    className={active ? 'dash-flow' : undefined}
                    style={{ transition: 'stroke .3s' }}
                  />
                  <circle
                    cx={s.x} cy={s.y}
                    r={active ? 3.4 : 2.6}
                    fill={active ? 'hsl(240 79% 43%)' : 'hsl(248 42% 25% / 0.3)'}
                    style={{ transition: 'all .3s' }}
                  />
                </g>
              ))}

              {/* progress ring */}
              <circle cx={m.cx} cy={m.cy} r="31" fill="none" stroke="hsl(248 42% 25% / 0.1)" strokeWidth="3" />
              {pct > 0 && (
                <circle
                  cx={m.cx} cy={m.cy} r="31" fill="none"
                  stroke="hsl(240 79% 43%)" strokeWidth="3" strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray={`${pct} 100`}
                  transform={`rotate(-90 ${m.cx} ${m.cy})`}
                  style={{ transition: 'stroke-dasharray .6s cubic-bezier(.2,.7,.2,1)' }}
                />
              )}
              {m.locked && (
                <circle cx={m.cx} cy={m.cy} r="31" fill="none" stroke="hsl(248 42% 25% / 0.25)" strokeWidth="1.5" strokeDasharray="3 5" />
              )}

              {/* pulse halo on active */}
              {active && (
                <circle cx={m.cx} cy={m.cy} r="26" fill="none" stroke="hsl(240 79% 43% / 0.5)" strokeWidth="1.5">
                  <animate attributeName="r" values="26;44" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.5;0" dur="1.6s" repeatCount="indefinite" />
                </circle>
              )}

              {/* hub disc */}
              <circle
                cx={m.cx} cy={m.cy} r="24"
                fill={active ? 'url(#hub-blue)' : 'url(#disc-paper)'}
                filter={active ? undefined : 'url(#disc-inset)'}
                stroke={active ? 'rgba(255,255,255,0.35)' : 'hsl(248 42% 25% / 0.1)'}
                strokeWidth="1"
                style={{ transition: 'fill .3s' }}
              />
              <text
                x={m.cx} y={m.cy + 4.5}
                textAnchor="middle"
                className="mono"
                fontSize="13" fontWeight="600"
                fill={active ? '#ffffff' : 'hsl(248 42% 25% / 0.75)'}
              >
                {m.num}
              </text>

              {/* label */}
              <text
                x={left ? m.cx - 44 : m.cx + 44}
                y={m.cy - 2}
                textAnchor={left ? 'end' : 'start'}
                fontSize="12.5" fontWeight="600"
                letterSpacing="-0.01em"
                fill={active ? 'hsl(240 79% 43%)' : 'hsl(248 42% 25% / 0.85)'}
                style={{ transition: 'fill .3s' }}
              >
                {m.name}
              </text>
              <text
                x={left ? m.cx - 44 : m.cx + 44}
                y={m.cy + 14}
                textAnchor={left ? 'end' : 'start'}
                fontSize="10.5" fontWeight="500"
                fill="hsl(248 42% 25% / 0.45)"
                className="tnum"
              >
                {m.locked ? 'Coming soon' : `${m.count} card${m.count === 1 ? '' : 's'} · ${pct}%`}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="hairline-t px-1 pt-3 text-[11px] leading-relaxed text-ink-40">
        The map listens to the stack — hover a phase to light its constellation, tap a hub to jump.
      </p>
    </div>
  );
}
