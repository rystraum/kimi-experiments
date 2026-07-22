export default function Nav() {
  return (
    <header className="frost hairline-b sticky top-0 z-50">
      <div className="mx-auto flex h-[62px] max-w-[1200px] items-center gap-4 px-5 sm:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span
            className="app-icon flex h-[30px] w-[30px] items-center justify-center"
            style={{ background: 'linear-gradient(160deg, #4d4df0 0%, #1818c4 70%, #0e0e96 100%)' }}
          >
            <svg viewBox="0 0 32 32" className="h-[19px] w-[19px]" aria-hidden="true">
              <path
                d="m9 9 14 14M23 9 9 23"
                stroke="#fff"
                strokeWidth="3.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-[15px] font-bold tracking-[-0.02em]">
            APP.100X<span className="text-[hsl(var(--blue))]">VC</span>.IO
          </span>
        </a>

        <nav className="ml-2 hidden items-center sm:flex">
          <a
            href="/expedition"
            className="group flex items-center gap-1 rounded-full px-3 py-1.5 text-[13.5px] font-medium text-ink-70 transition-colors hover:text-[hsl(var(--blue))]"
          >
            Expedition
            <svg viewBox="0 0 10 10" className="h-2 w-2 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 1.5 3.5 3.5L3 8.5" />
            </svg>
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-[12.5px] text-ink-55 md:block">Already have an account?</span>
          <a
            href="/sign-in"
            className="btn-physical rounded-full px-4 py-[7px] text-[13px] font-semibold text-white"
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
}
