import { COACH, MILESTONES, SCORECARD } from '../../data/dashboard';

const MILESTONE_GLYPHS: Record<string, string> = {
  calendar: 'M2.5 4h11v9.5h-11zM2.5 4V2.5h11V4M5.5 1.5v2M10.5 1.5v2',
  doc: 'M4 2.5h5.5L12 5v8.5H4zM9.5 2.5V5H12M6 8h4M6 10.5h4',
  flask: 'M6.5 2.5v4l-3 6a1 1 0 0 0 .9 1.5h7.2a1 1 0 0 0 .9-1.5l-3-6v-4M5.5 2.5h5',
  cycle: 'M13 5.5A5.5 5.5 0 1 0 13.8 8M13 2.5v3h3',
};

/** Right rail — AI coach, meta-skill scorecard, upcoming milestones. */
export default function Rail() {
  return (
    <div className="space-y-6">
      {/* ——— AI coach ——— */}
      <section className="mat-card rounded-[20px] p-5">
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-40">AI Coach</p>
          <span className="h-[5px] w-[5px] rounded-full bg-[hsl(var(--green))]" />
          <span className="rounded-full bg-[hsl(var(--tint))] px-2 py-[2px] text-[9px] font-bold uppercase tracking-[0.1em] text-ink-55">
            Beta
          </span>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <span
            className="app-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: 'linear-gradient(160deg, #33322e 0%, #141412 100%)', borderRadius: '50%' }}
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2.5 9.6 6l3.7.4-2.8 2.5.8 3.6L8 10.6l-3.3 1.9.8-3.6-2.8-2.5L6.4 6z" />
            </svg>
          </span>
          <p className="font-serif text-[15.5px] font-semibold leading-snug">{COACH.greeting}</p>
        </div>

        <p className="mt-3 font-serif text-[13.5px] leading-relaxed text-ink-70">{COACH.body}</p>

        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em]">Key insight</p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-55">{COACH.insight}</p>
        </div>

        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em]">What to do next</p>
          <ul className="mt-2 space-y-1.5">
            {COACH.next.map((n) => (
              <li key={n} className="flex items-center gap-2 text-[12.5px] font-medium text-ink-70">
                <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-ink-40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6h8M7 3l3 3-3 3" />
                </svg>
                {n}
              </li>
            ))}
          </ul>
        </div>

        <div className="deboss mt-5 flex items-center gap-2 rounded-full py-1 pl-4 pr-1">
          <input
            placeholder="Ask me anything…"
            className="w-full bg-transparent text-[12.5px] outline-none placeholder:text-ink-40"
          />
          <button className="btn-physical flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white" aria-label="Send">
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 10V2M3 5l3-3 3 3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ——— meta skill scorecard ——— */}
      <section className="mat-card rounded-[20px] p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-40">Meta Skill Scorecard</p>
          <p className="text-[11px] text-ink-55">
            Overall <span className="tnum text-[13px] font-bold text-[hsl(var(--ink))]">{SCORECARD.overall}</span>
          </p>
        </div>
        <ul className="mt-4 space-y-[13px]">
          {SCORECARD.skills.map((s) => (
            <li key={s.name} className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-[12px] font-medium text-ink-70">
                <span className="h-1.5 w-1.5 rounded-full border border-[hsl(var(--ink)/0.35)]" />
                {s.name}
              </span>
              <span className="deboss h-[6px] flex-1 overflow-hidden rounded-full">
                <span className="block h-full rounded-full bg-[hsl(var(--ink))]" style={{ width: `${s.score * 10}%` }} />
              </span>
              <span className="tnum w-6 text-right text-[11.5px] font-bold">{s.score.toFixed(1)}</span>
            </li>
          ))}
        </ul>
        <button className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[hsl(var(--ink))] transition-transform hover:translate-x-0.5">
          View full scorecard
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </button>
      </section>

      {/* ——— upcoming milestones ——— */}
      <section className="mat-card rounded-[20px] p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-40">Upcoming Milestones</p>
          <button className="inline-flex items-center gap-1 text-[11.5px] font-semibold">
            View all
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </button>
        </div>
        <ul className="mt-4 space-y-3">
          {MILESTONES.map((m) => (
            <li key={m.name} className="flex items-center gap-3">
              <span className="emboss-plate flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-ink-70">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d={MILESTONE_GLYPHS[m.icon]} />
                </svg>
              </span>
              <span className="flex-1 truncate text-[12.5px] font-medium">{m.name}</span>
              <span className="mono text-[10.5px] font-semibold text-ink-55">{m.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
