import { Link, useParams } from 'react-router';
import AppShell from '../components/shell/AppShell';

const TITLES: Record<string, string> = {
  cycles: 'Cycles',
  workspace: 'Workspace',
  'ai-coach': 'AI Coach',
  library: 'Library',
  powwow: 'Powwow!',
  'p2p-learning': 'P2P Learning',
  yodaman: 'Yodaman!',
  credentials: 'My Credentials',
  evaluations: 'Evaluations',
  scorecard: 'Scorecard',
  network: 'Network',
  introductions: 'Introductions',
  opportunities: 'Opportunities',
  'value-rooms': 'Value Rooms',
  deals: 'Deals',
  analytics: 'Analytics',
  settings: 'Settings',
  admin: 'Admin',
  okrs: 'Weekly OKRs',
};

export default function Soon() {
  const { slug } = useParams();
  const title = TITLES[slug ?? ''] ?? 'This view';

  return (
    <AppShell>
      <div className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="deboss w-full max-w-[480px] rounded-[20px] px-8 py-12 text-center">
          <p className="font-serif text-[26px] font-semibold">{title} is still sealed.</p>
          <p className="mt-2.5 font-serif text-[14.5px] italic leading-relaxed text-ink-55">
            The room unlocks as your stack flips to black. Keep shipping signals.
          </p>
          <Link
            to="/"
            className="btn-physical mt-7 inline-block rounded-full px-6 py-2.5 text-[13px] font-semibold text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
