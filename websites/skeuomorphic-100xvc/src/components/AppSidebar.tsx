import { Link, useNavigate } from 'react-router';

const MAIN_NAV = [
  { num: '01', label: 'Commit', to: '/gps' },
  { num: '02', label: 'GPS', to: '/gps', active: true },
  { num: '03', label: 'Build-to-Skill', to: '/gps' },
  { num: '04', label: 'Credential', to: '/gps' },
  { num: '05', label: 'Distribute', to: '/gps' },
  { num: '06', label: 'Capitalize', to: '/gps' },
];

export default function AppSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="obsidian fixed inset-y-0 left-0 z-40 hidden w-[228px] flex-col rounded-none text-white md:flex">
      {/* brand */}
      <div className="flex items-center gap-2.5 px-5 pb-4 pt-5">
        <span
          className="app-icon flex h-[30px] w-[30px] items-center justify-center"
          style={{ background: 'linear-gradient(160deg, #4d4df0 0%, #1818c4 70%, #0e0e96 100%)' }}
        >
          <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" aria-hidden="true">
            <path d="m9 9 14 14M23 9 9 23" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
          </svg>
        </span>
        <span className="text-[14.5px] font-bold tracking-[-0.02em] text-white/95">100X OS</span>
      </div>

      {/* home */}
      <div className="px-3">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-[13px] font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 16 16" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m2.5 7 5.5-4.5L13.5 7M4 6.5V13a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V6.5" />
          </svg>
          Home
        </Link>
      </div>

      <div className="mx-5 my-3 border-t border-white/10" />

      {/* main nav */}
      <nav className="flex flex-col gap-0.5 px-3">
        {MAIN_NAV.map((item) => (
          <button
            key={item.num}
            onClick={() => navigate(item.to)}
            className={`flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-left text-[13px] transition-colors ${
              item.active
                ? 'bg-[hsl(var(--blue))] font-semibold text-white shadow-[0_4px_12px_-4px_hsl(var(--blue)/0.7)]'
                : 'font-medium text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={`mono text-[10.5px] font-semibold ${item.active ? 'text-white/80' : 'text-white/35'}`}>
              {item.num}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mx-5 my-3 border-t border-white/10" />

      {/* secondary */}
      <nav className="flex flex-col gap-0.5 px-3">
        <button className="flex items-center gap-2.5 rounded-[12px] px-2.5 py-[7px] text-left text-[13px] font-semibold text-white/85 transition-colors hover:bg-white/5">
          <span
            className="app-icon flex h-[22px] w-[22px] items-center justify-center text-[11px] font-extrabold text-white"
            style={{ background: 'linear-gradient(160deg, #f6a44a, #e0730f)' }}
          >
            Y
          </span>
          Yodaman!
        </button>
        <Link
          to="/expedition"
          className="rounded-[12px] px-2.5 py-[7px] text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          Expedition
        </Link>
        <a
          href="https://iconclass.co/about-us"
          target="_blank"
          rel="noreferrer"
          className="rounded-[12px] px-2.5 py-[7px] text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          About
        </a>
      </nav>

      {/* spacer */}
      <div className="flex-1" />

      {/* admin + account */}
      <div className="px-3 pb-4">
        <button className="flex w-full items-center justify-between rounded-[12px] px-2.5 py-[7px] text-[13px] font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white">
          Admin
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3.5 1.5 3.5 3.5-3.5 3.5" />
          </svg>
        </button>

        <div className="group relative mt-1">
          <button className="flex w-full items-center gap-2.5 rounded-[12px] bg-white/5 px-2.5 py-2 text-left transition-colors hover:bg-white/10">
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[hsl(var(--blue))] text-[11px] font-bold text-white">
              F
            </span>
            <span className="truncate text-[12px] font-medium text-white/75">fellow@100xvc.io</span>
          </button>

          {/* hover menu */}
          <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-full translate-y-1 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <div className="mat-card overflow-hidden rounded-[14px] p-1.5 text-[hsl(var(--ink))] shadow-[0_12px_32px_-10px_rgba(0,0,0,0.45)]">
              <button className="flex w-full items-center gap-2 rounded-[10px] px-2.5 py-2 text-left text-[12.5px] font-medium transition-colors hover:bg-[hsl(var(--tint))]">
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 text-ink-55" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7" cy="7" r="2.2" />
                  <path d="M7 1.5v1.6M7 10.9v1.6M1.5 7h1.6M10.9 7h1.6M3.1 3.1l1.1 1.1M9.8 9.8l1.1 1.1M10.9 3.1 9.8 4.2M4.2 9.8l-1.1 1.1" />
                </svg>
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
