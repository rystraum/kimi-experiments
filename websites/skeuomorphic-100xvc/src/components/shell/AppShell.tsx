import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Breadcrumb, { type Crumb } from './Breadcrumb';
import FontLab from './FontLab';

/** The peg shell — white sidebar, breadcrumb wayfinding, paper canvas. */
export default function AppShell({ children, crumbs }: { children: ReactNode; crumbs?: Crumb[] }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <FontLab />
      <div className="lg:pl-[232px]">
        {crumbs && crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}
        {children}
      </div>
    </div>
  );
}
