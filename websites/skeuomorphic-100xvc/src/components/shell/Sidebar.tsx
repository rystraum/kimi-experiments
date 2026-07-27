import { Link, useLocation, useNavigate } from 'react-router';

/* ——— thin geometric glyphs, ink, 1.5 stroke ——— */
const PATHS: Record<string, string> = {
  home: 'm2.5 7 5.5-4.5L13.5 7M4 6.5V13a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V6.5',
  stacks: 'M2.5 4.5h11M2.5 8h11M2.5 11.5h11',
  cycles: 'M13 5.5A5.5 5.5 0 1 0 13.8 8M13 2.5v3h3',
  workspace: 'M2.5 2.5h4.6v4.6H2.5zM8.9 2.5h4.6v4.6H8.9zM2.5 8.9h4.6v4.6H2.5zM8.9 8.9h4.6v4.6H8.9z',
  coach: 'M8 2.5 9.6 6l3.7.4-2.8 2.5.8 3.6L8 10.6l-3.3 1.9.8-3.6-2.8-2.5L6.4 6z',
  library: 'M8 5.5C6.5 4.3 4.6 4 3 4.4v8c1.6-.4 3.5-.1 5 1.1 1.5-1.2 3.4-1.5 5-1.1v-8c-1.6-.4-3.5-.1-5 1.1zm0 0v8',
  credential: 'M8 2.5 10 5l2.9.6-2 2.1.3 2.9L8 9.2l-2.7 1.4.3-2.9-2-2.1L6 5zM5 11.5v2M11 11.5v2',
  eval: 'M3 8.5h3l1.8-4 2.4 7 1.8-3H13.5',
  scorecard: 'M3 13.5V9M6.5 13.5V5.5M10 13.5V8M13.5 13.5V3',
  network: 'M5 5a2 2 0 1 0 0-.01M11 4.5a2 2 0 1 0 0-.01M8 11.5a2 2 0 1 0 0-.01M6.6 5.6l2.8-.7M6.2 6.8l1.2 2.7M10.3 6.3l-1.4 3',
  intro: 'M3 5.5h10M3 8h7M3 10.5h8.5M11 12l2 1.5-2 1.5',
  opportunity: 'M8 2.5v2M8 11.5v2M2.5 8h2M11.5 8h2M5 5l1.4 1.4M9.6 9.6 11 11M11 5 9.6 6.4M6.4 9.6 5 11',
  value: 'M3 6.5 8 3l5 3.5v5L8 13l-5-1.5zM8 3v10',
  deals: 'M5.5 8 8 10.5 13 5.5M3 3h10v10H3z',
  analytics: 'M3 13.5h11M4.5 10.5l2.5-3 2 1.5 3-4.5',
  powwow: 'M2.5 3h11v7h-6l-3 2.5v-2.5h-2z',
  p2p: 'M5 6a2.2 2.2 0 1 0 0-.01M11 6a2.2 2.2 0 1 0 0-.01M2.5 13c.6-2.4 1.6-3.5 2.5-3.5s1.9 1.1 2.5 3.5M8 13c.6-2.4 1.6-3.5 2.5-3.5s1.9 1.1 2.5 3.5',
  yoda: 'M8 3v4M4.5 4.5 8 7l3.5-2.5M5 13.5h6M8 7v6.5',
  becoming: 'M8 13.5c-3-1.5-4.5-3.5-4.5-6.5S5.5 3 8 2.5c2.5.5 4.5 2 4.5 4.5S11 12 8 13.5zM8 2.5v11',
  settings: 'M8 5.8A2.2 2.2 0 1 0 8 10.2 2.2 2.2 0 0 0 8 5.8zM8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.1 3.1l1.1 1.1M11.8 11.8l1.1 1.1M12.9 3.1 11.8 4.2M4.2 11.8l-1.1 1.1',
};

function Glyph({ d, size = 15 }: { d: string; size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

interface Item { glyph: string; label: string; to: string; num?: string; match?: string }

const NAV: Item[] = [
  { glyph: 'home', label: 'Home', to: '/', match: '/' },
  { glyph: 'stacks', label: 'Stacks', to: '/stacks', match: '/stacks' },
  { glyph: 'cycles', label: 'Cycles', to: '/soon/cycles' },
  { glyph: 'workspace', label: 'Workspace', to: '/soon/workspace' },
  { glyph: 'coach', label: 'AI Coach', to: '/soon/ai-coach' },
  { glyph: 'library', label: 'Library', to: '/soon/library' },
];

const STACKS: Item[] = [
  { num: '01', glyph: 'stacks', label: 'Commit', to: '/stacks#phase-entry' },
  { num: '02', glyph: 'stacks', label: 'Build-to-Skill', to: '/stacks#phase-build' },
  { num: '03', glyph: 'stacks', label: 'Credential', to: '/stacks#phase-credential' },
  { num: '04', glyph: 'stacks', label: 'Distribute', to: '/stacks#phase-match' },
  { num: '05', glyph: 'stacks', label: 'Capitalize', to: '/stacks#phase-onjob' },
];

const TOOLS: Item[] = [
  { glyph: 'powwow', label: 'Powwow!', to: '/soon/powwow' },
  { glyph: 'p2p', label: 'P2P Learning', to: '/soon/p2p-learning' },
  { glyph: 'yoda', label: 'Yodaman!', to: '/soon/yodaman' },
  { glyph: 'becoming', label: 'Becoming', to: '/gps', match: '/gps' },
];

const CREDENTIAL: Item[] = [
  { glyph: 'credential', label: 'My Credentials', to: '/soon/credentials' },
  { glyph: 'eval', label: 'Evaluations', to: '/soon/evaluations' },
  { glyph: 'scorecard', label: 'Scorecard', to: '/soon/scorecard' },
];

const DISTRIBUTE: Item[] = [
  { glyph: 'network', label: 'Network', to: '/soon/network' },
  { glyph: 'intro', label: 'Introductions', to: '/soon/introductions' },
  { glyph: 'opportunity', label: 'Opportunities', to: '/soon/opportunities' },
];

const MONETIZE: Item[] = [
  { glyph: 'value', label: 'Value Rooms', to: '/soon/value-rooms' },
  { glyph: 'deals', label: 'Deals', to: '/soon/deals' },
  { glyph: 'analytics', label: 'Analytics', to: '/soon/analytics' },
];

function NavItem({ item, active }: { item: Item; active: boolean }) {
  return (
    <Link
      to={item.to}
      className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-[7px] text-[13px] transition-colors ${
        active
          ? 'bg-[hsl(var(--tint))] font-semibold text-[hsl(var(--ink))]'
          : 'font-medium text-ink-55 hover:bg-[hsl(var(--tint)/0.55)] hover:text-[hsl(var(--ink))]'
      }`}
    >
      {item.num ? (
        <span className={`mono w-[15px] text-[10px] font-semibold ${active ? '' : 'text-ink-40'}`}>{item.num}</span>
      ) : (
        <Glyph d={PATHS[item.glyph]} />
      )}
      {item.label}
    </Link>
  );
}

function Section({ title, items, path }: { title: string; items: Item[]; path: string }) {
  return (
    <div className="mt-5">
      <p className="px-2.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">{title}</p>
      <div className="mt-1.5 flex flex-col gap-0.5">
        {items.map((i) => (
          <NavItem key={i.label} item={i} active={!!i.match && path === i.match} />
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hairline fixed inset-y-0 left-0 z-40 hidden w-[232px] flex-col border-r bg-white lg:flex">
      {/* brand */}
      <div className="flex items-center gap-2.5 px-5 pb-3 pt-5">
        <span
          className="app-icon flex h-[30px] w-[30px] items-center justify-center"
          style={{ background: 'linear-gradient(160deg, #33322e 0%, #141412 100%)' }}
        >
          <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" aria-hidden="true">
            <path d="m9 9 14 14M23 9 9 23" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
        </span>
        <span className="font-serif text-[19px] font-bold tracking-[-0.01em]">
          100X&nbsp;<span className="font-medium text-ink-55">OS</span>
        </span>
      </div>
      <p className="px-5 text-[9px] font-bold uppercase leading-relaxed tracking-[0.16em] text-ink-40">
        Operating System<br />for Meta Builders
      </p>

      <div className="hairline-t mx-5 mt-4" />

      {/* scrollable nav */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="mt-4 px-2.5">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-40">Build with leverage</p>
          <p className="mt-1 font-serif text-[12.5px] italic leading-snug text-ink-55">
            We help you build systems that escape the J-Curve.
          </p>
        </div>

        <Section title="Navigation" items={NAV} path={pathname} />
        <Section title="Stacks" items={STACKS} path={pathname} />
        <Section title="Tools" items={TOOLS} path={pathname} />
        <Section title="Credential" items={CREDENTIAL} path={pathname} />
        <Section title="Distribute" items={DISTRIBUTE} path={pathname} />
        <Section title="Monetize" items={MONETIZE} path={pathname} />

        <div className="mt-5 flex flex-col gap-0.5">
          <NavItem item={{ glyph: 'settings', label: 'Settings', to: '/soon/settings' }} active={false} />
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
