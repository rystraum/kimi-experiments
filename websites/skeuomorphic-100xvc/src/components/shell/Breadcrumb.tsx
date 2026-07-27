import { Link } from 'react-router';

export interface Crumb {
  label: string;
  to?: string;
}

/** HOME > 02 BUILD-TO-SKILL > WEEKLY EXECUTION — the peg wayfinder. */
export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 px-5 pt-5 text-[11px] font-semibold uppercase tracking-[0.1em] sm:px-8">
      {crumbs.map((c, i) => (
        <span key={c.label} className="flex items-center gap-2">
          {i > 0 && (
            <svg viewBox="0 0 8 8" className="h-2 w-2 text-ink-40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2.5 1 3 3-3 3" />
            </svg>
          )}
          {c.to ? (
            <Link to={c.to} className="text-ink-55 transition-colors hover:text-[hsl(var(--ink))]">
              {c.label}
            </Link>
          ) : (
            <span className="flex items-center gap-1.5 text-[hsl(var(--ink))]">
              {c.label}
              <svg viewBox="0 0 8 8" className="h-2 w-2 rotate-90 text-ink-40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2.5 1 3 3-3 3" />
              </svg>
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
