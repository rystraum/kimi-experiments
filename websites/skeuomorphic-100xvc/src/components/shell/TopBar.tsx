import { useEffect, useRef } from 'react';
import { USER } from '../../data/dashboard';

export default function TopBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="hairline-b sticky top-0 z-30 flex h-[58px] items-center gap-4 bg-[hsl(var(--paper)/0.8)] px-5 backdrop-blur-xl sm:px-8">
      {/* search */}
      <button
        onClick={() => inputRef.current?.focus()}
        className="deboss flex w-full max-w-[380px] items-center gap-2.5 rounded-full px-4 py-[7px] text-left"
      >
        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0 text-ink-40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="6" cy="6" r="4.2" />
          <path d="m9.5 9.5 3 3" />
        </svg>
        <input
          ref={inputRef}
          placeholder="Search anything…"
          className="w-full bg-transparent text-[13px] text-[hsl(var(--ink))] outline-none placeholder:text-ink-40"
        />
        <kbd className="mono shrink-0 rounded-[5px] border border-[hsl(var(--ink)/0.1)] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-ink-55">
          ⌘K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1.5">
        {/* notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-55 transition-colors hover:bg-[hsl(var(--tint))] hover:text-[hsl(var(--ink))]" aria-label="Notifications">
          <svg viewBox="0 0 16 16" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2.5a4 4 0 0 0-4 4v2.7l-1.3 2h10.6l-1.3-2V6.5a4 4 0 0 0-4-4zM6.5 13a1.6 1.6 0 0 0 3 0" />
          </svg>
          <span className="absolute right-[9px] top-[9px] h-[7px] w-[7px] rounded-full bg-[hsl(var(--green))] ring-2 ring-[hsl(var(--paper))]" />
        </button>
        {/* messages */}
        <button className="flex h-9 w-9 items-center justify-center rounded-full text-ink-55 transition-colors hover:bg-[hsl(var(--tint))] hover:text-[hsl(var(--ink))]" aria-label="Messages">
          <svg viewBox="0 0 16 16" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 3h11v7.5h-6.5L4.5 13v-2.5h-2z" />
          </svg>
        </button>
        {/* account */}
        <button className="ml-1 flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2.5 transition-colors hover:bg-[hsl(var(--tint))]">
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[hsl(var(--ink))] text-[11px] font-bold text-white">
            {USER.initials}
          </span>
          <span className="hidden text-[13px] font-semibold sm:block">{USER.name}</span>
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-ink-40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m2 3.5 3 3 3-3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
