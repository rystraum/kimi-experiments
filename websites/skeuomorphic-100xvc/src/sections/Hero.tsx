import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import VectorCanvas from '../components/VectorCanvas';
import SegmentedControl from '../components/SegmentedControl';
import { HERO_LINES } from '../data/os';

const STATS: Array<[string, string]> = [
  ['$100K–1M++', 'in VC investments, engagements & contracts'],
  ['100-day', 'high-impact signal cycles'],
  ['42', 'cards in the stack, all start white'],
  ['5', 'phases from entry to on-the-job'],
];

export default function Hero() {
  const [mode, setMode] = useState('Build');

  return (
    <section className="relative overflow-hidden">
      <VectorCanvas className="absolute inset-0 h-full w-full" />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-24">
        <p className="eyebrow">The world&rsquo;s skilling · credentialing · on-the-job OS</p>

        <h1 className="mx-auto mt-5 text-[64px] font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-[104px]">
          100X&nbsp;<span className="text-[hsl(var(--blue))]">OS</span>
        </h1>

        <div className="mt-7 flex justify-center">
          <SegmentedControl options={['Build', 'Skill', 'Cash']} value={mode} onChange={setMode} />
        </div>

        <div className="mx-auto mt-6 h-[72px] max-w-[560px] sm:h-[60px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0.24, 1] }}
              className="text-[15.5px] leading-relaxed text-ink-70 sm:text-[16.5px]"
            >
              {HERO_LINES[mode]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="/expedition"
            className="btn-physical rounded-full px-6 py-3 text-[14.5px] font-semibold text-white"
          >
            Begin the Expedition
          </a>
          <a
            href="https://iconclass.co/about-us"
            target="_blank"
            rel="noreferrer"
            className="btn-plate flex items-center gap-1.5 rounded-full px-5 py-3 text-[14px] font-semibold text-ink-70"
          >
            Origin Story
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9 9 3M4.5 3H9v4.5" />
            </svg>
          </a>
        </div>

        {/* debossed stat wells */}
        <div className="mx-auto mt-14 grid max-w-[880px] grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div key={l} className="deboss rounded-[18px] px-4 py-4 text-left">
              <div className="tnum text-[22px] font-bold tracking-[-0.03em] text-[hsl(var(--ink))]">
                {v}
              </div>
              <div className="mt-1 text-[11px] leading-snug text-ink-55">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
