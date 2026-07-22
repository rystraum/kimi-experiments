export interface OsCard {
  id: string;
  code: string;
  name: string;
  tag?: string;
  desc: string;
  icon?: 'video' | 'yoda' | 'chart' | 'book' | 'compass';
  iconHue?: [string, string];
  sealed?: string;
  /** if set, clicking the card navigates here instead of flipping */
  to?: string;
}

export interface OsGroup {
  id: string;
  code: string;
  name: string;
  note?: string;
  cards: OsCard[];
}

export interface OsPhase {
  id: string;
  num: string;
  name: string;
  caption: string;
  groups: OsGroup[];
  comingSoon?: boolean;
}

export const HERO_LINES: Record<string, string> = {
  Build:
    'Drive high-impact signals in 100-day cycles — faster, and with more power of prediction for investors, employers and markets.',
  Skill:
    'The world\u2019s skilling, credentialing and on-the-job OS — for people who drive outsized impact and ROI.',
  Cash:
    'Turn your stack to black to earn US$100,000\u20131,000,000++ in VC investments, commercial engagements, or hiring contracts.',
};

export const PHASES: OsPhase[] = [
  {
    id: 'entry',
    num: '0',
    name: 'Entry + Eligibility',
    caption: 'Two cards stand between you and the OS.',
    groups: [
      {
        id: 'entry-main',
        code: '0',
        name: 'Gateway',
        cards: [
          {
            id: 'calling-card',
            code: '0.1',
            name: 'Calling Card',
            desc: 'Complete this card to access all other cards, jumpstart 100X ROI and unleash the 100X Build-Invest OS. Your world will never be the same again.',
          },
          {
            id: 'entry-card',
            code: '0.2',
            name: 'Entry Card',
            tag: 'Applications closed',
            desc: 'Apply for the 100X Fellowship — our 16-week build-invest expedition with founders and investors, and the only path to 100XVC.IO funding. No pitch decks, no meetings. No exceptions.',
          },
        ],
      },
    ],
  },
  {
    id: 'build',
    num: '1',
    name: 'Build + Skill',
    caption: 'Six disciplines. Twenty-two power cards. One stack.',
    groups: [
      {
        id: 'core-discipline',
        code: '1.1',
        name: 'Core Discipline',
        note: 'The weekly rhythm of the expedition',
        cards: [
          {
            id: 'powwow',
            code: 'W1',
            name: 'Weekly Powwow',
            tag: 'Live every Thursday',
            icon: 'video',
            iconHue: ['#4f7cf0', '#2745c8'],
            desc: 'Your gateway into each week\u2019s online community of practice. Live-from-the-battlefield, real-stakes case studies; peer-to-peer learning-by-doing; builders and investors in lock-step feedback loops.',
          },
          {
            id: 'yodaman',
            code: 'W2',
            name: 'Weekly Yodaman',
            icon: 'yoda',
            iconHue: ['#f6a44a', '#e0730f'],
            desc: 'At your service. A masterful force of the universe, equal parts human and tech — relentlessly getting better, sharper, faster at advancing your capacity for application, iteration, reinvention. Ultimately, revolution.',
          },
          {
            id: 'okr',
            code: 'W3',
            name: 'Weekly OKR',
            icon: 'chart',
            iconHue: ['#8f7bf0', '#5b3fd4'],
            desc: 'Set your weekly objectives and key results, then track progress against them.',
          },
          {
            id: 'learning',
            code: 'W4',
            name: 'Weekly Learning',
            icon: 'book',
            iconHue: ['#f06d8b', '#d92d54'],
            desc: 'Capture and share what you learned this week from real-stakes building and feedback loops.',
          },
          {
            id: 'gps',
            code: 'W5',
            name: 'GPS Wayfinding',
            tag: 'Weekly check-in',
            icon: 'compass',
            iconHue: ['#3fc8a8', '#0e9578'],
            desc: 'Navigate your journey with clear direction and milestones.',
          },
        ],
      },
      {
        id: 'problem-set',
        code: '1.2',
        name: 'Problem Set',
        note: 'Go big by starting small',
        cards: [
          {
            id: 'nuke-now',
            code: '00',
            name: 'Nuke Now',
            to: '/gps',
            desc: 'The first principle of 100X ROI+IMPACT: the Narrowest Viable Use Case that addresses the most important problems of your most important customers.',
          },
          {
            id: 'power-customer',
            code: '01',
            name: 'Power Customer',
            to: '/gps',
            desc: 'The top 10\u201320% most important customers who drive 80% of market impact and financial success in the next 12\u201318 months. Get used to Power Law — 80% of answers don\u2019t matter.',
          },
          {
            id: 'power-outcomes',
            code: '02',
            name: 'Power Outcome/s',
            to: '/gps',
            desc: 'Power Customer POV: the top 10\u201320% most important KPIs that account for 80% of their most valued outcomes.',
          },
          {
            id: 'power-pains',
            code: '03',
            name: 'Power Pain/s',
            to: '/gps',
            desc: 'Power Customer POV: the top 10\u201320% most important fails driving 80% of their most damaging pains on the journey towards Power Outcomes.',
          },
          {
            id: 'power-delta',
            code: '04',
            name: 'Power Delta 10X',
            to: '/gps',
            desc: 'Power Customer POV: the top 10\u201320% most critical change that will 10x the customer experience. This is the key to 100X ROI+IMPACT.',
          },
          {
            id: 'power-cx',
            code: '05',
            name: 'Power CX',
            to: '/gps',
            desc: 'CX as a vision story told in vivid detail and deep empathy: how your Power Customer journeys through your solution — where, when, how often, with who, why. Don\u2019t build without this.',
          },
        ],
      },
      {
        id: 'solution-set',
        code: '1.3',
        name: 'Solution Set',
        note: 'Anchor everything on Power Delta',
        cards: [
          {
            id: 'power-solution',
            code: '06',
            name: 'Power Solution',
            desc: 'Build the solution anchored on the most important functions and features driving Power Delta and Power CX.',
          },
          {
            id: 'power-usage',
            code: '07',
            name: 'Power Usage',
            desc: 'Build meaningful usage anchored on the most important drivers of Power Delta and Power CX.',
          },
          {
            id: 'power-impact',
            code: '08',
            name: 'Power Impact',
            desc: 'Drive significant customer outcomes and impact — proof that you are delivering Power Delta 10X, the key to 100X ROI+IMPACT.',
          },
        ],
      },
      {
        id: 'profitability',
        code: '1.4',
        name: 'Profitability',
        note: 'Where value compounds',
        cards: [
          { id: 'power-revenue', code: '09', name: 'Power Revenue', desc: 'The top 1\u20132 monetization models that will drive 80% of Customer Lifetime Value.' },
          { id: 'power-retention', code: '10', name: 'Power Retention', desc: 'The top 1\u20132 factors that will drive customer retention and recurring revenue.' },
          { id: 'power-upsell', code: '11', name: 'Power Up-sell', desc: 'The top 1\u20132 factors to drive up-selling — higher value of the same solution sold to the same customer.' },
          { id: 'power-cross-sell', code: '12', name: 'Power Cross-sell', desc: 'The top 1\u20132 factors to drive cross-selling related solutions to the same customer.' },
          { id: 'power-cross-monetize', code: '13', name: 'Power Cross-monetize', desc: 'The top 1\u20132 factors to drive cross-monetization — byproducts like data or access sold to a different customer.' },
          { id: 'power-advocacy', code: '14', name: 'Power Advocacy', desc: 'The top 1\u20132 factors to drive customer referrals — one Power Customer brings five new Power Customers.' },
          { id: 'power-economics', code: '15', name: 'Power Economics', desc: 'The top 2\u20133 biggest and most critical cost drivers.' },
        ],
      },
      {
        id: 'scalability',
        code: '1.5',
        name: 'Scalability',
        note: 'Repeatable, systematic growth',
        cards: [
          { id: 'power-channel', code: '16', name: 'Power Channel', desc: 'The 1\u20132 channels where you find Power Customers — what, where and when you grab attention and convert at the most efficient scale.' },
          { id: 'power-acquisition', code: '17', name: 'Power Acquisition', desc: 'The 1\u20132 acquisition programs that drive 80% of Power Customer acquisition.' },
          { id: 'power-scale', code: '18', name: 'Power Scale', desc: 'The top 1\u20132 factors that drive 80% of scalability.' },
        ],
      },
      {
        id: 'wayfinding',
        code: '1.6',
        name: '100X Wayfinding',
        note: 'From NUKE NOW to End Game',
        cards: [
          { id: 'next-nuke', code: '19', name: 'Next Nuke', desc: 'You 10X\u2019ed NUKE NOW — what are your NEXT NUKE/s?' },
          { id: 'end-game', code: '20', name: 'End Game', desc: 'The scale and scope of opportunity when you\u2019ve maximized Enterprise Value — and realized that value for shareholders.' },
          { id: 'x-wayfinding', code: '21', name: '100X Wayfinding', desc: 'From NUKE NOW, to NEXT NUKE/s, to SOM/SAM/TAM and the 100X End Game. The credible path to 100X ROI+IMPACT.' },
        ],
      },
    ],
  },
  {
    id: 'credential',
    num: '2',
    name: 'Credential + Signal',
    caption: 'Due diligence, revalida, and the five-star stamp.',
    groups: [
      {
        id: 'credential-main',
        code: '2',
        name: 'Proof of Work',
        cards: [
          { id: 'power-circle', code: '2.1', name: 'Power Circle', desc: 'Submit your 100X OS for formal due diligence and funding consideration. Unlocks at Fellow 1-Star; max 3 submissions.' },
          { id: 'session-card', code: '2.2', name: 'Session Card', desc: 'Live Agentic Revalida — the interview. Deep Dive & Challenge OS.' },
          { id: 'authentication', code: '2.3', name: 'Authentication', desc: 'Validate the integrity and caliber of your OS.' },
          { id: 'x-venture', code: '2.4', name: '100X Venture', desc: 'The official stamp — five-star credential value for VCs investing.' },
          { id: 'icon-class', code: '2.5', name: 'Icon Class', desc: 'The official stamp — five-star credential value for icons hiring.' },
          { id: 'cv-transcripts', code: '2.6', name: 'CV + Transcripts', desc: 'The official transcript of your 100X OS meta skills and leadership profile.' },
        ],
      },
    ],
  },
  {
    id: 'match',
    num: '3',
    name: 'Match + Engage',
    caption: 'Agentic circulation, inbound and outbound.',
    groups: [
      {
        id: 'match-main',
        code: '3',
        name: 'Circulation',
        cards: [
          { id: 'preferences', code: '3.1', name: 'Preferences + Parameters', desc: 'Set who you want to meet and why — fundraising, investment, cofounder, and more.' },
          { id: 'search-fit', code: '3.2', name: 'Search for Fit', desc: 'Find profiles and opportunities aligned with your preferences and goals.' },
          { id: 'outbound', code: '3.3', name: 'Outbound Circulation', desc: '24/7 agentic search across the web for investor and hiring profiles that fit you.' },
          { id: 'inbound', code: '3.4', name: 'Inbound Circulation', desc: 'Agentic content creation placed where it generates inbound interest and inquiries.' },
          { id: 'network-capital', code: '3.5', name: 'Weekly Network Capital', desc: 'Curated people you should meet each week.' },
          { id: 'venture-capital', code: '3.6', name: '100X\u2605Venture Capital', desc: 'Flip cards to black and earn Yodaman, Ignite and Kaya badges to unlock $100K\u2013$1M+ in VC investments.' },
          { id: 'icon-engagements', code: '3.7', name: 'Icon\u2605Class Engagements', desc: 'Flip cards to black and earn hiring badges to engage our network of recruiters.' },
        ],
      },
    ],
  },
  {
    id: 'onjob',
    num: '4',
    name: 'On the Job OS',
    caption: 'The operating system keeps working after the match.',
    comingSoon: true,
    groups: [],
  },
];

export function phaseCardCount(phase: OsPhase): number {
  return phase.groups.reduce((n, g) => n + g.cards.length, 0);
}
