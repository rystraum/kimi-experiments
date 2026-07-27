import { Link } from 'react-router';
import { ACTIVE_STACKS } from '../../data/dashboard';
import { StatusDot } from './Focus';

const GLYPHS: Record<string, string> = {
  compass: 'M8 8m-5.5 0a5.5 5.5 0 1 0 11 0 5.5 5.5 0 1 0-11 0M10.2 5.8 9.3 8.7 6.4 9.6l.9-2.9z',
  radar: 'M8 8m-5.5 0a5.5 5.5 0 1 0 11 0 5.5 5.5 0 1 0-11 0M8 8m-2.5 0a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0M8 8l3.5-3.5',
  loop: 'M3.5 8a4.5 4.5 0 0 1 8.2-2.5M12.5 8a4.5 4.5 0 0 1-8.2 2.5M11.7 2.5v3h-3M4.3 13.5v-3h3',
  vault: 'M3 3.5h10v9H3zM8 8m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M5.5 12.5v1M10.5 12.5v1',
};

export default function ActiveStacks() {
  return (
    <section>
      <div className="flex items-baseline justify-between px-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-40">Active Stacks</p>
        <Link to="/stacks" className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[hsl(var(--ink))] transition-transform hover:translate-x-0.5">
          View all
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </Link>
      </div>

      <div className="mat-card mt-3 divide-y divide-[hsl(var(--ink)/0.06)] rounded-[20px]">
        {ACTIVE_STACKS.map((s) => (
          <Link
            key={s.id}
            to="/stacks"
            className="group flex items-center gap-4 px-5 py-4 transition-colors first:rounded-t-[20px] last:rounded-b-[20px] hover:bg-[hsl(var(--tint)/0.4)] sm:px-6"
          >
            <span className="emboss-plate flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] text-ink-70">
              <svg viewBox="0 0 16 16" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d={GLYPHS[s.icon]} />
              </svg>
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate font-serif text-[16px] font-semibold tracking-[0]">{s.name}</span>
              <span className="block truncate text-[12px] text-ink-55">{s.caption}</span>
            </span>

            <span className="hidden items-center gap-3 md:flex">
              <span className="tnum w-9 text-right text-[12.5px] font-bold">{s.pct}%</span>
              <span className="deboss h-[7px] w-[110px] overflow-hidden rounded-full">
                <span
                  className="block h-full rounded-full bg-[hsl(var(--ink))]"
                  style={{ width: `${s.pct}%` }}
                />
              </span>
            </span>

            <span className="hidden w-[86px] sm:block">
              <StatusDot status={s.status} />
            </span>
            <span className="mono hidden w-[52px] text-right text-[10.5px] font-medium text-ink-40 xl:block">{s.ago}</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full text-ink-40 opacity-0 transition-opacity group-hover:opacity-100">
              <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="currentColor">
                <circle cx="2.5" cy="6" r="1.3" /><circle cx="6" cy="6" r="1.3" /><circle cx="9.5" cy="6" r="1.3" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
