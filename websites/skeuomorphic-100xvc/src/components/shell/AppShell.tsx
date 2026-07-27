import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

/** The peg shell — white sidebar, frosted top bar, paper canvas. */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-[232px]">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
