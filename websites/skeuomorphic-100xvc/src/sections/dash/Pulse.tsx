import { ACTIVITY, SIGNALS } from '../../data/dashboard';

/** Recent activity + network signals — the two-column pulse row. */
export default function Pulse() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* recent activity */}
      <section className="mat-card rounded-[20px] p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-40">Recent Activity</p>
        <ul className="mt-4 divide-y divide-[hsl(var(--ink)/0.06)]">
          {ACTIVITY.map((a) => (
            <li key={a.text} className="flex items-baseline justify-between gap-4 py-[11px] first:pt-0 last:pb-0">
              <span className="text-[13px] leading-snug text-ink-70">{a.text}</span>
              <span className="mono shrink-0 text-[10.5px] font-medium text-ink-40">{a.ago}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* network signals */}
      <section className="mat-card rounded-[20px] p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-40">Network Signals</p>
        <ul className="mt-4 space-y-3.5">
          {SIGNALS.map((s) => (
            <li key={s.name} className="flex items-center gap-3">
              <span className="emboss-plate flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-ink-70">
                {s.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-semibold">{s.name}</span>
                <span className="block truncate text-[11.5px] text-ink-55">{s.role}</span>
              </span>
              <span className="rounded-full bg-[hsl(var(--green)/0.12)] px-2.5 py-[3px] text-[10.5px] font-semibold text-[hsl(var(--green))]">
                {s.fit}
              </span>
              <span className="mono w-[44px] text-right text-[10.5px] font-medium text-ink-40">{s.ago}</span>
            </li>
          ))}
        </ul>
        <button className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[hsl(var(--ink))] transition-transform hover:translate-x-0.5">
          View all signals
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </button>
      </section>
    </div>
  );
}
