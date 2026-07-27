import { useEffect, useRef, useState } from 'react';

interface SerifOption {
  id: string;
  name: string;
  stack: string;
  note: string;
}

const OPTIONS: SerifOption[] = [
  { id: 'newsreader', name: 'Newsreader', stack: '"Newsreader", Georgia, serif', note: 'Editorial · optical-sized' },
  { id: 'fraunces', name: 'Fraunces', stack: '"Fraunces", Georgia, serif', note: 'Warm · oldstyle character' },
  { id: 'source-serif', name: 'Source Serif 4', stack: '"Source Serif 4", Georgia, serif', note: 'Neutral · technical' },
  { id: 'spectral', name: 'Spectral', stack: '"Spectral", Georgia, serif', note: 'Light · literary' },
  { id: 'playfair', name: 'Playfair Display', stack: '"Playfair Display", Georgia, serif', note: 'High contrast · luxe' },
  { id: 'lora', name: 'Lora', stack: '"Lora", Georgia, serif', note: 'Balanced · bookish' },
  { id: 'crimson', name: 'Crimson Pro', stack: '"Crimson Pro", Georgia, serif', note: 'Classic book serif' },
  { id: 'garamond', name: 'EB Garamond', stack: '"EB Garamond", Georgia, serif', note: 'Renaissance · elegant' },
];

const KEY = '100x-serif';

function apply(opt: SerifOption) {
  document.documentElement.style.setProperty('--serif', opt.stack);
}

/** Floating serif switcher — upper right, previews every candidate in its own typeface. */
export default function FontLab() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<SerifOption>(OPTIONS[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const opt = OPTIONS.find((o) => o.id === saved) ?? OPTIONS[0];
    setCurrent(opt);
    apply(opt);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const pick = (opt: SerifOption) => {
    setCurrent(opt);
    apply(opt);
    localStorage.setItem(KEY, opt.id);
    setOpen(false);
  };

  return (
    <div ref={ref} className="fixed right-4 top-3.5 z-50 sm:right-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="emboss-plate flex items-center gap-2 rounded-full py-[6px] pl-3.5 pr-2.5 transition-shadow hover:shadow-[0_4px_14px_-6px_hsl(var(--ink)/0.25)]"
        aria-expanded={open}
        aria-label="Change serif font"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ink-55" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12.5 7.5 3h1L13 12.5M4.6 9.5h6.8" />
        </svg>
        <span className="text-[13px]" style={{ fontFamily: current.stack }}>{current.name}</span>
        <svg viewBox="0 0 10 10" className={`h-2.5 w-2.5 text-ink-40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2 3.5 3 3 3-3" />
        </svg>
      </button>

      {open && (
        <div className="mat-card absolute right-0 mt-2 w-[248px] overflow-hidden rounded-[16px] p-1.5">
          <p className="px-2.5 pb-1.5 pt-2 text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">
            Serif voice layer
          </p>
          {OPTIONS.map((o) => {
            const active = o.id === current.id;
            return (
              <button
                key={o.id}
                onClick={() => pick(o)}
                className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-2.5 py-2 text-left transition-colors ${
                  active ? 'bg-[hsl(var(--tint))]' : 'hover:bg-[hsl(var(--tint)/0.55)]'
                }`}
              >
                <span>
                  <span className="block text-[15px] leading-tight" style={{ fontFamily: o.stack }}>
                    {o.name}
                  </span>
                  <span className="mt-0.5 block text-[10.5px] text-ink-40">{o.note}</span>
                </span>
                {active && (
                  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-[hsl(var(--ink))]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m2.5 6.2 2.4 2.4 4.6-5" />
                  </svg>
                )}
              </button>
            );
          })}
          <div className="hairline-t mx-2.5 my-1.5" />
          <p className="px-2.5 pb-1.5 text-[10px] leading-relaxed text-ink-40">
            Sans + mono instrument layer stays fixed — only the voice changes.
          </p>
        </div>
      )}
    </div>
  );
}
