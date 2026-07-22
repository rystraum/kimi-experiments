import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import type { OsCard } from '../data/os';
import AppIcon from './AppIcon';

interface Props {
  card: OsCard;
  flipped: boolean;
  onFlip: () => void;
}

/** A card in the stack — white face; flips to black, or navigates if the card has a destination. */
export default function PowerCard({ card, flipped, onFlip }: Props) {
  const navigate = useNavigate();
  const opens = !!card.to;

  return (
    <motion.button
      layout
      onClick={opens ? () => navigate(card.to!) : onFlip}
      whileTap={{ scale: 0.985 }}
      className={`block h-full w-full cursor-pointer text-left outline-none ${opens ? 'group' : 'flip-scene'}`}
      aria-pressed={opens ? undefined : flipped}
      aria-label={`${card.name} — ${opens ? 'open card' : flipped ? 'flipped to black' : 'flip to black'}`}
    >
      <div className={opens ? 'relative h-full' : `flip-inner ${flipped ? 'is-flipped' : ''}`}>
        {/* ——— white face ——— */}
        <div className="flip-face mat-card flex flex-col rounded-[18px] p-4">
          <div className="flex items-start justify-between gap-2">
            {card.icon && card.iconHue ? (
              <AppIcon glyph={card.icon} hue={card.iconHue} size={40} />
            ) : (
              <span className="emboss-plate mono flex h-9 min-w-9 items-center justify-center rounded-[11px] px-1.5 text-[12.5px] font-semibold text-ink-70">
                {card.code}
              </span>
            )}
            {opens ? (
              <span className="emboss-plate mt-0.5 flex h-[24px] w-[24px] items-center justify-center rounded-full text-ink-55 transition-all duration-200 group-hover:bg-[hsl(var(--blue))] group-hover:text-white">
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 9.5 9.5 2.5M4.5 2.5h5v5" />
                </svg>
              </span>
            ) : (
              <span
                className={`mt-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full transition-all duration-300 ${
                  flipped ? '' : 'deboss text-transparent'
                }`}
              >
                <svg viewBox="0 0 10 10" className="h-2 w-2" aria-hidden="true">
                  <circle cx="5" cy="5" r="4" fill="hsl(var(--ink) / 0.25)" />
                </svg>
              </span>
            )}
          </div>

          <div className="mt-3 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h4 className="text-[14.5px] font-semibold leading-snug tracking-[-0.015em]">
                {card.name}
              </h4>
              {card.tag && (
                <span
                  className={`rounded-full px-2 py-[2.5px] text-[10px] font-semibold uppercase tracking-[0.06em] ${
                    card.tag.toLowerCase().includes('closed')
                      ? 'bg-[hsl(var(--amber)/0.12)] text-[hsl(var(--amber))]'
                      : 'bg-[hsl(var(--green)/0.12)] text-[hsl(var(--green))]'
                  }`}
                >
                  {card.tag}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-55">{card.desc}</p>
          </div>

          <div className="hairline-t mt-3 flex items-center justify-between pt-2.5">
            <span className="mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-40">
              {card.code} · white
            </span>
            <span className="text-[10.5px] font-semibold text-[hsl(var(--blue))]">
              {opens ? 'Open card →' : 'Flip to black →'}
            </span>
          </div>
        </div>

        {/* ——— black face (flip cards only) ——— */}
        {!opens && (
        <div className="flip-face flip-back obsidian flex flex-col rounded-[18px] p-4 text-white">
          <div className="flex items-start justify-between">
            <span className="mono flex h-9 min-w-9 items-center justify-center rounded-[11px] bg-white/10 px-1.5 text-[12.5px] font-semibold text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              {card.code}
            </span>
            <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white text-[hsl(var(--ink))]">
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2.5 6.2 2.4 2.4 4.6-5" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex-1">
            <h4 className="text-[14.5px] font-semibold leading-snug tracking-[-0.015em] text-white/95">
              {card.name}
            </h4>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/55">
              In the black. This signal now counts toward your credential, your badges — and the unlock.
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
            <span className="mono text-[10px] font-medium uppercase tracking-[0.1em] text-white/40">
              {card.code} · black
            </span>
            <span className="text-[10.5px] font-semibold text-white/75">Flip back</span>
          </div>
        </div>
        )}
      </div>
    </motion.button>
  );
}
