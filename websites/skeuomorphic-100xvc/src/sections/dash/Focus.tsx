import { Link } from 'react-router';
import { FOCUS, type Status } from '../../data/dashboard';

export function StatusDot({ status }: { status: Status }) {
  const color =
    status === 'on-track'
      ? 'hsl(var(--green))'
      : status === 'at-risk'
        ? 'hsl(var(--amber))'
        : 'hsl(var(--destructive))';
  const label = status === 'on-track' ? 'On Track' : status === 'at-risk' ? 'At Risk' : 'Behind';
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: color }} />
      <span className="text-[11.5px] font-medium text-ink-70">{label}</span>
    </span>
  );
}

/** This week's focus + weekly OKRs — the command panel. */
export default function Focus() {
  return (
    <section className="mat-card grid rounded-[20px] sm:grid-cols-2">
      {/* left: focus */}
      <div className="p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-40">This week's focus</p>
          <p className="mono text-[10.5px] font-medium text-ink-40">{FOCUS.week}</p>
        </div>
        <h2 className="mt-4 font-serif text-[26px] font-semibold leading-tight tracking-[-0.005em]">
          {FOCUS.title}
        </h2>
        <p className="mt-1.5 font-serif text-[14.5px] italic text-ink-55">{FOCUS.caption}</p>

        <div className="mt-8">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-55">Total Progress</span>
            <span className="tnum text-[13px] font-bold">{FOCUS.progress}%</span>
          </div>
          <div className="deboss mt-2 h-[8px] overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-[hsl(var(--ink))] transition-[width] duration-700"
              style={{ width: `${FOCUS.progress}%` }}
            />
          </div>
        </div>

        <Link
          to="/soon/workspace"
          className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[hsl(var(--ink))] transition-transform hover:translate-x-0.5"
        >
          Open Workspace
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </Link>
      </div>

      {/* right: weekly OKRs */}
      <div className="hairline-t p-6 sm:border-l sm:border-t-0 sm:p-7" style={{ borderLeftColor: 'hsl(var(--ink)/0.09)' }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-40">Weekly OKRs</p>
        <ul className="mt-4 space-y-4">
          {FOCUS.okrs.map((o) => (
            <li key={o.text} className="flex items-center justify-between gap-4">
              <span className="text-[13.5px] font-medium leading-snug">{o.text}</span>
              <StatusDot status={o.status} />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-end">
          <Link
            to="/soon/okrs"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[hsl(var(--ink))] transition-transform hover:translate-x-0.5"
          >
            View All OKRs
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
