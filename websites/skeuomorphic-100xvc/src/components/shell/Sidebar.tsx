import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

/* ——— thin geometric glyphs, ink ——— */
const PATHS: Record<string, string> = {
  home: 'm2.5 7 5.5-4.5L13.5 7M4 6.5V13a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V6.5',
  stacks: 'M2.5 4.5h11M2.5 8h11M2.5 11.5h11',
  layers: 'm8 2.5 5.5 2.6L8 7.7 2.5 5.1zM2.5 8.2 8 10.8l5.5-2.6M2.5 11.3 8 13.9l5.5-2.6',
  zero: 'M8 8m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0M5.5 8h5',
  powwow: 'M2.5 3h11v7h-6l-3 2.5v-2.5h-2z',
  p2p: 'M5 6a2.2 2.2 0 1 0 0-.01M11 6a2.2 2.2 0 1 0 0-.01M2.5 13c.6-2.4 1.6-3.5 2.5-3.5s1.9 1.1 2.5 3.5M8 13c.6-2.4 1.6-3.5 2.5-3.5s1.9 1.1 2.5 3.5',
  yoda: 'M8 3v4M4.5 4.5 8 7l3.5-2.5M5 13.5h6M8 7v6.5',
  becoming: 'M8 13.5c-3-1.5-4.5-3.5-4.5-6.5S5.5 3 8 2.5c2.5.5 4.5 2 4.5 4.5S11 12 8 13.5zM8 2.5v11',
  settings: 'M8 5.8A2.2 2.2 0 1 0 8 10.2 2.2 2.2 0 0 0 8 5.8zM8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.1 3.1l1.1 1.1M11.8 11.8l1.1 1.1M12.9 3.1 11.8 4.2M4.2 11.8l-1.1 1.1',
};

export function Glyph({ d, size = 15 }: { d: string; size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

interface StackLink {
  slug: string;
  num: string;
  label: string;
  subs?: { glyph: string; label: string; to?: string }[];
}

const STACK_LINKS: StackLink[] = [
  { slug: 'commit', num: '01', label: 'Commit' },
  {
    slug: 'build-to-skill',
    num: '02',
    label: 'Build-to-Skill',
    subs: [
      { glyph: 'layers', label: 'Weekly Execution', to: '/stacks/weekly-execution' },
      { glyph: 'zero', label: 'Ground Zero', to: '/stacks/ground-zero' },
      { glyph: 'layers', label: 'Entry Microcosm' },
      { glyph: 'layers', label: 'Value Macrocosm' },
      { glyph: 'layers', label: 'Capture Economics' },
      { glyph: 'layers', label: 'Efficient Scale' },
      { glyph: 'layers', label: '100X ROI + Impact' },
    ],
  },
  { slug: 'credential', num: '03', label: 'Credential' },
  { slug: 'distribute', num: '04', label: 'Distribute' },
  { slug: 'capitalize', num: '05', label: 'Capitalize' },
];

const TOOL_LINKS = [
  { glyph: 'powwow', label: 'Powwow!', to: '/powwow' },
  { glyph: 'p2p', label: 'P2P Learning', to: '/soon/p2p-learning' },
  { glyph: 'yoda', label: 'Yodaman!', to: '/soon/yodaman' },
  { glyph: 'becoming', label: 'Becoming', to: '/gps' },
];

const itemCls = (active: boolean) =>
  `flex items-center gap-2.5 rounded-[10px] px-2.5 py-[7px] text-[13px] transition-colors ${
    active
      ? 'bg-[hsl(var(--tint))] font-semibold text-[hsl(var(--ink))]'
      : 'font-medium text-ink-55 hover:bg-[hsl(var(--tint)/0.55)] hover:text-[hsl(var(--ink))]'
  }`;

function StackItem({ stack, pathname }: { stack: StackLink; pathname: string }) {
  const navigate = useNavigate();
  const base = `/stacks/${stack.slug}`;
  const inSection = pathname.startsWith(base);
  const [open, setOpen] = useState(inSection);

  return (
    <div>
      <div className={`group ${itemCls(inSection)} cursor-pointer justify-between`} onClick={() => navigate(base)}>
        <span className="flex items-center gap-2.5">
          <span className={`mono w-[15px] text-[10px] font-semibold ${inSection ? '' : 'text-ink-40'}`}>{stack.num}</span>
          {stack.label}
        </span>
        {stack.subs && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen((o) => !o);
            }}
            aria-label={open ? 'Collapse' : 'Expand'}
            className="flex h-5 w-5 items-center justify-center rounded-md text-ink-40 transition-colors hover:text-[hsl(var(--ink))]"
          >
            <svg
              viewBox="0 0 10 10"
              className={`h-2.5 w-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="m2 3.5 3 3 3-3" />
            </svg>
          </button>
        )}
      </div>

      {stack.subs && open && (
        <div className="mb-1 ml-[13px] flex flex-col gap-0.5 border-l border-[hsl(var(--ink)/0.08)] pl-3 pt-0.5">
          {stack.subs.map((s) => {
            const active = !!s.to && pathname === s.to;
            return s.to ? (
              <Link key={s.label} to={s.to} className={itemCls(active) + ' !py-[6px] text-[12.5px]'}>
                <Glyph d={PATHS[s.glyph]} size={13} />
                {s.label}
              </Link>
            ) : (
              <span key={s.label} className="flex items-center gap-2.5 rounded-[10px] px-2.5 py-[6px] text-[12.5px] font-medium text-ink-40">
                <Glyph d={PATHS[s.glyph]} size={13} />
                {s.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hairline fixed inset-y-0 left-0 z-40 hidden w-[232px] flex-col border-r bg-white lg:flex">
      {/* brand */}
      <Link to="/" className="flex items-center gap-2.5 px-5 pb-3 pt-5">
        <span
          className="app-icon flex h-[30px] w-[30px] items-center justify-center"
          style={{ background: 'linear-gradient(160deg, #33322e 0%, #141412 100%)' }}
        >
          <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" aria-hidden="true">
            <path d="m9 9 14 14M23 9 9 23" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
        </span>
        <span className="font-display text-[19px] font-bold tracking-[-0.01em]">
          100X&nbsp;<span className="font-medium text-ink-55">OS</span>
        </span>
      </Link>
      <p className="px-5 text-[9px] font-bold uppercase leading-relaxed tracking-[0.16em] text-ink-40">
        Operating System<br />for Meta Builders
      </p>

      <div className="hairline-t mx-5 mt-4" />

      {/* nav */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="mt-4 flex flex-col gap-0.5">
          <Link to="/" className={itemCls(pathname === '/')}>
            <Glyph d={PATHS.home} />
            Home
          </Link>
        </div>

        {/* stacks group */}
        <div className="mt-5">
          <p className="px-2.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">Stacks</p>
          <div className="mt-1.5 flex flex-col gap-0.5">
            {STACK_LINKS.map((s) => (
              <StackItem key={s.slug} stack={s} pathname={pathname} />
            ))}
          </div>
        </div>

        {/* tools group */}
        <div className="mt-5">
          <p className="px-2.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">Tools</p>
          <div className="mt-1.5 flex flex-col gap-0.5">
            {TOOL_LINKS.map((t) => (
              <Link key={t.label} to={t.to} className={itemCls(pathname === t.to)}>
                <Glyph d={PATHS[t.glyph]} />
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* account */}
      <div className="hairline-t px-3 py-3">
        <button
          onClick={() => navigate('/soon/admin')}
          className="flex w-full items-center justify-between rounded-[10px] px-2.5 py-[7px] text-[13px] font-medium text-ink-55 transition-colors hover:bg-[hsl(var(--tint)/0.55)] hover:text-[hsl(var(--ink))]"
        >
          Admin
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3.5 1.5 3.5 3.5-3.5 3.5" />
          </svg>
        </button>

        <div className="group relative mt-1">
          <button className="flex w-full items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-left transition-colors hover:bg-[hsl(var(--tint)/0.55)]">
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[hsl(var(--ink))] text-[10px] font-bold text-white">
              AY
            </span>
            <span className="truncate text-[12px] font-medium text-ink-70">andre@100xvc.io</span>
          </button>
          {/* hover menu */}
          <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-full translate-y-1 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <div className="mat-card overflow-hidden rounded-[14px] p-1.5">
              <button className="flex w-full items-center gap-2 rounded-[10px] px-2.5 py-2 text-left text-[12.5px] font-medium transition-colors hover:bg-[hsl(var(--tint))]">
                <Glyph d={PATHS.settings} size={14} />
                Settings
              </button>
              <div className="hairline-t mx-2 my-1" />
              <button className="flex w-full items-center gap-2 rounded-[10px] px-2.5 py-2 text-left text-[12.5px] font-medium text-[hsl(var(--destructive))] transition-colors hover:bg-[hsl(var(--destructive)/0.08)]">
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5.5 2.5h-2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2M9 4.5 11.5 7 9 9.5M11.5 7H5.5" />
                </svg>
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
