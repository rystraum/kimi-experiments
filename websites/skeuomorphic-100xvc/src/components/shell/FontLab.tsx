import { useEffect, useRef, useState } from 'react';

interface FontOption {
  id: string;
  name: string;
  stack: string;
  note: string;
  sans?: boolean;
}

const OPTIONS: FontOption[] = [
  { id: 'newsreader', name: 'Newsreader', stack: '"Newsreader", Georgia, serif', note: 'Editorial · optical-sized' },
  { id: 'fraunces', name: 'Fraunces', stack: '"Fraunces", Georgia, serif', note: 'Warm · oldstyle character' },
  { id: 'source-serif', name: 'Source Serif 4', stack: '"Source Serif 4", Georgia, serif', note: 'Neutral · technical' },
  { id: 'spectral', name: 'Spectral', stack: '"Spectral", Georgia, serif', note: 'Light · literary' },
  { id: 'playfair', name: 'Playfair Display', stack: '"Playfair Display", Georgia, serif', note: 'High contrast · luxe' },
  { id: 'lora', name: 'Lora', stack: '"Lora", Georgia, serif', note: 'Balanced · bookish' },
  { id: 'crimson', name: 'Crimson Pro', stack: '"Crimson Pro", Georgia, serif', note: 'Classic book serif' },
  { id: 'garamond', name: 'EB Garamond', stack: '"EB Garamond", Georgia, serif', note: 'Renaissance · elegant' },
  { id: 'inter', name: 'Inter', stack: '"Inter", -apple-system, sans-serif', note: 'The instrument layer', sans: true },
  { id: 'work-sans', name: 'Work Sans', stack: '"Work Sans", -apple-system, sans-serif', note: 'Geometric grotesque', sans: true },
];

type Slot = 'title' | 'body';

const TOKEN: Record<Slot, string> = { title: '--serif-display', body: '--serif-body' };
const KEY: Record<Slot, string> = { title: '100x-font-title', body: '100x-font-body' };
const LABEL: Record<Slot, string> = { title: 'Titles', body: 'Body' };
const LEGACY_KEY = '100x-serif';

function apply(slot: Slot, opt: FontOption) {
  document.documentElement.style.setProperty(TOKEN[slot], opt.stack);
}

/** Floating font lab — two switchable voices: titles & body. Serif + sans candidates. */
export default function FontLab() {
  const [open, setOpen] = useState<Slot | null>(null);
  const [sel, setSel] = useState<Record<Slot, FontOption>>({ title: OPTIONS[0], body: OPTIONS[0] });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const legacy = localStorage.getItem(LEGACY_KEY);
    const next = { title: OPTIONS[0], body: OPTIONS[0] };
    (['title', 'body'] as Slot[]).forEach((s) => {
      const saved = localStorage.getItem(KEY[s]) ?? legacy;
      const opt = OPTIONS.find((o) => o.id === saved) ?? OPTIONS[0];
      next[s] = opt;
      apply(s, opt);
    });
    setSel(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const pick = (slot: Slot, opt: FontOption) => {
    setSel((s) => ({ ...s, [slot]: opt }));
    apply(slot, opt);
    localStorage.setItem(KEY[slot], opt.id);
    setOpen(null);
  };

  const optionRow = (slot: Slot) => (o: FontOption) => {
    const active = o.id === sel[slot].id;
    return (
      <button
        key={o.id}
        onClick={() => pick(slot, o)}
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
  };

  const pill = (slot: Slot) => (
    <div key={slot} className="relative">
      <button
        onClick={() => setOpen((o) => (o === slot ? null : slot))}
        className="emboss-plate flex items-center gap-2 rounded-full py-[6px] pl-3.5 pr-2.5 transition-shadow hover:shadow-[0_4px_14px_-6px_hsl(var(--ink)/0.25)]"
        aria-expanded={open === slot}
        aria-label={`Change ${LABEL[slot].toLowerCase()} font`}
      >
        <span className="hidden text-[9px] font-bold uppercase tracking-[0.12em] text-ink-40 sm:inline">
          {LABEL[slot]}
        </span>
        <span className="text-[13px] leading-none" style={{ fontFamily: sel[slot].stack }}>
          {sel[slot].name}
        </span>
        <svg viewBox="0 0 10 10" className={`h-2.5 w-2.5 text-ink-40 transition-transform duration-200 ${open === slot ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="m2 3.5 3 3 3-3" />
        </svg>
      </button>

      {open === slot && (
        <div className="mat-card absolute right-0 mt-2 max-h-[72vh] w-[248px] overflow-y-auto rounded-[16px] p-1.5">
          <p className="px-2.5 pb-1.5 pt-2 text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">
            {slot === 'title' ? 'Title voice' : 'Body voice'} · Serif
          </p>
          {OPTIONS.filter((o) => !o.sans).map(optionRow(slot))}
          <div className="hairline-t mx-2.5 my-1.5" />
          <p className="px-2.5 pb-1.5 pt-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">
            Sans — for contrast
          </p>
          {OPTIONS.filter((o) => o.sans).map(optionRow(slot))}
        </div>
      )}
    </div>
  );

  return (
    <div ref={ref} className="fixed right-4 top-3.5 z-50 flex items-start gap-2 sm:right-6">
      {pill('title')}
      {pill('body')}
    </div>
  );
}
