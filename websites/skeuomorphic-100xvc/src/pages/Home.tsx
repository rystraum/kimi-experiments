import AppShell from '../components/shell/AppShell';
import Greeting from '../sections/dash/Greeting';
import Focus from '../sections/dash/Focus';
import ActiveStacks from '../sections/dash/ActiveStacks';
import Pulse from '../sections/dash/Pulse';
import Rail from '../sections/dash/Rail';

export default function Home() {
  return (
    <AppShell>
      <Greeting />

      <div className="grid gap-6 px-5 pb-10 sm:px-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* main column */}
        <div className="space-y-8">
          <Focus />
          <ActiveStacks />
          <Pulse />
        </div>

        {/* right rail */}
        <Rail />
      </div>

      <footer className="hairline-t flex flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-[11.5px] text-ink-40">
          © 100X OS&ensp;·&ensp;<span className="font-serif italic">Build leverage. Create escape velocity.</span>
        </p>
        <div className="flex gap-5 text-[11.5px] font-medium text-ink-55">
          <a href="#" className="hover:text-[hsl(var(--ink))]">Terms</a>
          <a href="#" className="hover:text-[hsl(var(--ink))]">Privacy</a>
          <a href="#" className="hover:text-[hsl(var(--ink))]">Help</a>
        </div>
      </footer>
    </AppShell>
  );
}
