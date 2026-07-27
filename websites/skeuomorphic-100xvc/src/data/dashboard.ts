/* ——— dashboard content model ——— */

export const USER = { name: 'Andre Yap', first: 'Andre', initials: 'AY' };

export type Status = 'on-track' | 'at-risk' | 'behind';

export const FOCUS = {
  week: 'Week 07 of 16',
  title: 'Define Unfair Advantage',
  caption: 'Build the system that compounds.',
  progress: 38,
  okrs: [
    { text: 'Define and validate core unfair advantage', status: 'on-track' as Status },
    { text: 'Map the compounding flywheel', status: 'on-track' as Status },
    { text: 'Run 3 high-signal experiments', status: 'at-risk' as Status },
  ],
};

export interface ActiveStack {
  id: string;
  icon: string;
  name: string;
  caption: string;
  pct: number;
  status: Status;
  ago: string;
}

export const ACTIVE_STACKS: ActiveStack[] = [
  { id: 'venture', icon: 'compass', name: 'Venture Architecture Stack', caption: 'Design the 100X venture system', pct: 75, status: 'on-track', ago: '2h ago' },
  { id: 'customer', icon: 'radar', name: 'Customer Value Stack', caption: 'Deepen empathy. Validate relentlessly', pct: 60, status: 'on-track', ago: '5h ago' },
  { id: 'growth', icon: 'loop', name: 'Growth Engine Stack', caption: 'Design for compounding acquisition', pct: 40, status: 'at-risk', ago: '1d ago' },
  { id: 'capital', icon: 'vault', name: 'Capital Strategy Stack', caption: 'Structure for optionality and scale', pct: 20, status: 'behind', ago: '2d ago' },
];

export const ACTIVITY = [
  { text: 'AI Coach reviewed your Venture Architecture Stack', ago: '5m ago' },
  { text: 'You updated your OKR: Map the compounding flywheel', ago: '1h ago' },
  { text: 'Experiment 2: Value Proposition Test completed', ago: '3h ago' },
  { text: 'Credential evaluation passed: Systems Thinking', ago: '1d ago' },
  { text: 'New introduction from Jason L.', ago: '2d ago' },
];

export const SIGNALS = [
  { initials: 'J', name: 'Jason L.', role: 'Partner, 100XVC', fit: 'High Fit', ago: '3h ago' },
  { initials: 'M', name: 'Maya K.', role: 'Head of Growth, PayMongo', fit: 'High Fit', ago: '1d ago' },
  { initials: 'V', name: 'Investor interested in your stack', role: 'AI Score: 88% Match', fit: 'High Fit', ago: '2d ago' },
];

export const COACH = {
  greeting: "Here's my take, Andre.",
  body: "Your unfair advantage is getting clearer. You've identified a real wedge. Now strengthen the compounding loop.",
  insight: 'The more you help SMBs embed payments data, the more valuable your network becomes. Double down on data moats.',
  next: ['Deepen first-principles clarity', 'Validate the network effect early', 'Design the compounding loop'],
};

export const SCORECARD = {
  overall: '8.8 / 10',
  skills: [
    { name: 'First Principles', score: 8.8 },
    { name: 'Systems Thinking', score: 9.2 },
    { name: 'Power Law', score: 8.3 },
    { name: 'Customer Centricity', score: 8.7 },
    { name: 'Radical Outcomes', score: 9.0 },
    { name: 'Agile Execution', score: 8.6 },
    { name: 'Learning Acuity', score: 8.9 },
    { name: 'Leadership', score: 9.1 },
  ],
};

export const MILESTONES = [
  { icon: 'calendar', name: 'Stakeholder Interview Sprint', date: 'Jul 25' },
  { icon: 'doc', name: 'Solution Architecture v1', date: 'Jul 28' },
  { icon: 'flask', name: 'Experiment Review', date: 'Aug 01' },
  { icon: 'cycle', name: 'Cycle Review & Reset', date: 'Aug 04' },
];
