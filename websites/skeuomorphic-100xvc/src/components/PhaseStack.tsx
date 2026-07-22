import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { OsPhase } from '../data/os';
import PowerCard from './PowerCard';

interface Props {
  phase: OsPhase;
  expanded: boolean;
  highlighted: boolean;
  done: number;
  total: number;
  flipped: Record<string, boolean>;
  onToggle: () => void;
  onFlipCard: (cardId: string) => void;
  onHover: (id: string | null) => void;
}

const PhaseCard = forwardRef<HTMLDivElement, Props>(function PhaseCard(
  { phase, expanded, highlighted, done, total, flipped, onToggle, onFlipCard, onHover },
  ref,
) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const locked = phase.comingSoon;

  return (
    <div
      ref={ref}
      id={`phase-${phase.id}`}
      className="relative scroll-mt-28"
      onMouseEnter={() => onHover(phase.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* receding sheet — the physical stack beneath a collapsed card */}
      <motion.div
        aria-hidden
        animate={{ opacity: expanded || locked ? 0 : 1 }}
        className="absolute inset-x-[10px] -bottom-[6px] h-4 rounded-b-[20px] border border-[hsl(var(--ink)/0.05)] bg-[#f8f9f4]"
      />

      <div
        className={`mat-card relative rounded-[22px] transition-shadow duration-300 ${
          highlighted ? 'ring-2 ring-[hsl(var(--blue)/0.45)]' : ''
        }`}
        style={highlighted ? { boxShadow: '0 1px 2px hsl(var(--ink)/0.04), 0 16px 36px -16px hsl(var(--blue)/0.3)' } : undefined}
      >
        {/* ——— phase header ——— */}
        <button
          onClick={locked ? undefined : onToggle}
          disabled={locked}
          className={`flex w-full items-center gap-4 rounded-[22px] px-5 py-4 text-left outline-none sm:px-6 sm:py-5 ${
            locked ? 'cursor-default' : 'cursor-pointer'
          }`}
          aria-expanded={expanded}
        >
          {/* number well */}
          <span
            className={`mono flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold transition-all duration-300 ${
              highlighted || expanded
                ? 'text-white shadow-[0_4px_10px_-4px_hsl(var(--blue)/0.55)]'
                : 'deboss text-ink-70'
            }`}
            style={highlighted || expanded ? { background: 'hsl(var(--blue))' } : undefined}
          >
            {phase.num}
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-[16.5px] font-semibold tracking-[-0.02em] sm:text-[18px]">
              {phase.name}
            </span>
            <span className="mt-0.5 block truncate text-[12.5px] text-ink-55">{phase.caption}</span>
          </span>

          {/* progress */}
          {!locked && (
            <span className="hidden items-center gap-3 sm:flex">
              <span className="deboss h-[10px] w-[104px] overflow-hidden rounded-full">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ background: 'hsl(var(--blue))' }}
                  initial={false}
                  animate={{ width: `${Math.max(pct, 2.5)}%` }}
                  transition={{ type: 'spring', stiffness: 160, damping: 24 }}
                />
              </span>
              <span className="mono tnum w-10 text-right text-[12px] font-semibold text-ink-70">
                {pct}%
              </span>
            </span>
          )}

          {locked ? (
            <span className="emboss-plate rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-ink-55">
              Coming soon
            </span>
          ) : (
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="emboss-plate flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-70"
            >
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
              </svg>
            </motion.span>
          )}
        </button>

        {/* ——— expanded body ——— */}
        <AnimatePresence initial={false}>
          {expanded && !locked && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0.24, 1] }}
              className="overflow-hidden"
            >
              <div className="hairline-t mx-5 sm:mx-6" />
              <div className="space-y-7 px-5 pb-6 pt-5 sm:px-6">
                {phase.groups.map((g) => (
                  <div key={g.id}>
                    {phase.groups.length > 1 && (
                      <div className="mb-3 flex items-baseline gap-2.5">
                        <span className="emboss-plate mono rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-ink-70">
                          {g.code}
                        </span>
                        <h3 className="text-[13.5px] font-semibold tracking-[-0.01em]">{g.name}</h3>
                        {g.note && <span className="text-[11.5px] text-ink-40">{g.note}</span>}
                      </div>
                    )}
                    <div
                      className={`grid gap-3.5 ${
                        phase.groups.length === 1 && g.cards.length <= 2
                          ? 'sm:grid-cols-2'
                          : 'sm:grid-cols-2 xl:grid-cols-3'
                      }`}
                    >
                      {g.cards.map((c) => (
                        <div
                          key={c.id}
                          className={
                            g.id === 'core-discipline'
                              ? 'h-[292px]'
                              : g.cards.length <= 2 && phase.groups.length === 1
                                ? 'h-[252px]'
                                : 'h-[236px]'
                          }
                        >
                          <PowerCard
                            card={c}
                            flipped={!!flipped[c.id]}
                            onFlip={() => onFlipCard(c.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <p className="flex items-center gap-2 text-[11px] text-ink-40">
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="6" cy="6" r="5" />
                    <path d="M6 3.5v3l2 1.4" strokeLinecap="round" />
                  </svg>
                  Tap any card to flip it to black — the phase meter and the OS map keep score.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ——— sealed phase ——— */}
        {locked && (
          <div className="px-5 pb-5 sm:px-6">
            <div className="deboss flex items-center justify-between gap-4 rounded-[16px] px-5 py-4">
              <p className="text-[12.5px] leading-relaxed text-ink-55">
                The OS keeps working after the match — rituals, reviews and revenue on the job.
                Sealed until the stack above is in the black.
              </p>
              <span className="emboss-plate mono shrink-0 -rotate-6 rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[hsl(var(--amber))]">
                Sealed
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default PhaseCard;
