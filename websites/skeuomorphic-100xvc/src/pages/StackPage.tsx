import { Link, useParams } from 'react-router';
import AppShell from '../components/shell/AppShell';
import { STACK_PAGES, type StackCardItem } from '../data/stacks';

const CARD_GLYPHS: Record<string, string> = {
  id: 'M3 2.5h10v11H3zM6 7a1.6 1.6 0 1 0 3.2 0A1.6 1.6 0 0 0 6 7zm-1 4.5c.4-1.6 1.5-2.4 3-2.4s2.6.8 3 2.4M10.8 5h1.4M10.8 7h1.4',
  folder: 'M2.5 4A1.5 1.5 0 0 1 4 2.5h2.6l1.4 1.8h5.5v7.7a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5z',
  people: 'M5.2 6.5a2.1 2.1 0 1 0 0-.01M10.8 6.5a2.1 2.1 0 1 0 0-.01M2.8 13c.5-2.2 1.5-3.3 2.4-3.3s1.8 1.1 2.3 3.3M8.5 13c.5-2.2 1.5-3.3 2.3-3.3s1.9 1.1 2.4 3.3',
  compass: 'M8 8m-5.5 0a5.5 5.5 0 1 0 11 0 5.5 5.5 0 1 0-11 0M10.2 5.8 9.3 8.7 6.4 9.6l.9-2.9z',
  layers: 'm8 2.5 5.5 2.6L8 7.7 2.5 5.1zM2.5 8.2 8 10.8l5.5-2.6M2.5 11.3 8 13.9l5.5-2.6',
  zero: 'M8 8m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0M5.5 8h5',
};

/** A stack room — the peg's 3-column card grid (01 COMMIT, 02 BUILD-TO-SKILL). */
export default function StackPage() {
  const { slug } = useParams();
  const stack = slug ? STACK_PAGES[slug] : undefined;

  if (!stack) {
    return (
      <AppShell crumbs={[{ label: 'Home', to: '/' }, { label: 'Stacks' }]}>
        <div className="flex min-h-[60vh] items-center justify-center px-5">
          <div className="deboss w-full max-w-[480px] rounded-[20px] px-8 py-12 text-center">
            <p className="font-serif text-[26px] font-semibold">This stack is still sealed.</p>
            <p className="mt-2.5 font-serif text-[14.5px] italic leading-relaxed text-ink-55">
              It unlocks as the stacks before it flip to black.
            </p>
            <Link to="/stacks" className="btn-physical mt-7 inline-block rounded-full px-6 py-2.5 text-[13px] font-semibold text-white">
              Back to Stacks
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell crumbs={[{ label: 'Home', to: '/' }, { label: `${stack.num} ${stack.name}` }]}>
      <main className="mx-auto max-w-[1240px] px-5 pb-24 pt-7 sm:px-8">
        <h1 className="font-serif text-[42px] font-bold leading-none tracking-[-0.01em] sm:text-[52px]">
          {stack.num} {stack.name}
        </h1>
        {stack.blurb && (
          <p className="mt-3 max-w-[620px] font-serif text-[15px] leading-relaxed text-ink-55">{stack.blurb}</p>
        )}

        <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {stack.cards.map((c: StackCardItem) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="emboss-plate flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] text-[hsl(var(--ink))]">
                    <svg viewBox="0 0 16 16" className="h-[21px] w-[21px]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d={CARD_GLYPHS[c.glyph]} />
                    </svg>
                  </span>
                  <svg viewBox="0 0 12 12" className={`mt-2 h-3 w-3 transition-all duration-200 ${c.to ? 'text-ink-40 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--ink))]' : 'text-transparent'}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6h8M7 3l3 3-3 3" />
                  </svg>
                </div>
                <h3 className="mt-4 text-[14px] font-bold uppercase tracking-[0.04em]">{c.name}</h3>
                <p className="mt-2 flex-1 font-serif text-[13.5px] leading-relaxed text-ink-55">{c.desc}</p>
                <div className="hairline-t mt-4 pt-3.5">
                  <span className={`text-[12.5px] font-semibold ${c.to ? 'text-[hsl(var(--ink))]' : 'text-ink-40'}`}>
                    {c.to ? 'Open →' : 'Open'}
                  </span>
                </div>
              </>
            );

            return c.to ? (
              <Link key={c.name} to={c.to} className="mat-card group flex flex-col rounded-[18px] p-5 transition-shadow duration-200 hover:shadow-[0_1px_2px_hsl(var(--ink)/0.04),0_16px_36px_-16px_hsl(var(--ink)/0.22)]">
                {inner}
              </Link>
            ) : (
              <div key={c.name} className="mat-card group flex cursor-default flex-col rounded-[18px] p-5">
                {inner}
              </div>
            );
          })}
        </div>
      </main>
    </AppShell>
  );
}
