/* ——— stack pages content model (from the live app) ——— */

export interface StackCardItem {
  glyph: string;
  name: string;
  desc: string;
  to?: string; // card detail route; absent = sealed
}

export interface StackDef {
  num: string;
  name: string;
  blurb?: string;
  cards: StackCardItem[];
}

export const STACK_PAGES: Record<string, StackDef> = {
  commit: {
    num: '01',
    name: 'COMMIT',
    cards: [
      {
        glyph: 'id',
        name: 'CALLING CARD',
        desc: 'Complete this card to make yourself an entity in the 100X universe— and unlock a sequence of stacks that will, if you stay its course, unleash your greatest version of 100X ROI+IMPACT. Again and again you will 100X. Your world will never be the same again.',
      },
      {
        glyph: 'folder',
        name: 'ENTRY CARD',
        desc: "Complete this card to apply for the 100X EXPEDITION-- a 16-week deep-dive to operationalize 100X ROI+IMPACT in what you're doing. 100X in the company of founders, CEOs, investors and other exceptional talent. This is also your only path to 100XVC.IO funding or ICON★CLASS engagements. No exceptions. We don't take pitch decks or meetings. The only way in is to complete this Entry Card.",
      },
      {
        glyph: 'people',
        name: 'SESSION CARD',
        desc: 'Congratulations! You have earned this SESSION CARD– strictly by invitation only for ENTRY CARDS that passed our first screen. We see your potential and would like to explore your fit for EXPEDITION 2026.',
      },
      {
        glyph: 'compass',
        name: 'EXPEDITION CARD',
        desc: 'Congratulations and welcome to EXPEDITION 2026. Strictly by invitation only for exceptional talent who seriously want to change the world. Like, this kind of Steve Jobs Change the World. Whether you were admitted via 100XVC.IO, ICON★CLASS, or Ni2, you are now entering our 100X Movement. Our goal is singular: to drive 100X ROI+IMPACT in our respective fields of endeavor– above all, a testament to 100X execution, culture and OS.',
      },
    ],
  },
  'build-to-skill': {
    num: '02',
    name: 'BUILD-TO-SKILL',
    cards: [
      {
        glyph: 'layers',
        name: 'WEEKLY EXECUTION',
        desc: 'Weekly execution sprint: set OKRs, harvest BTL learnings, and compound leverage every week.',
        to: '/stacks/weekly-execution',
      },
      {
        glyph: 'zero',
        name: 'GROUND ZERO',
        desc: 'This is our starting point. Let’s frame the problem set we want to 100X– i.e., where we want to drive outsized impact and ROI.',
        to: '/stacks/ground-zero',
      },
      {
        glyph: 'layers',
        name: 'ENTRY MICROCOSM',
        desc: 'What line of attack gives us the best chance to break through this problem set, acquire &/or retain avid customers who love us, and thus secure a solid beach head from which to build and expand into the bigger problem set? Let’s break down the problem into its core or nuclear microcosm.',
      },
      {
        glyph: 'layers',
        name: 'VALUE MACROCOSM',
        desc: 'In ENTRY MICROCOSM, we zoomed into the core or nuclear dynamics of our problem set– the NUKE NOW. Here in VALUE MACROCOSM, we zoom out to track NEXT NUKEs (adjacencies) and plot the maximum value we can create, accelerate and capture. We track down who in the stakeholder chain is capturing the value we create and we calibrate how we take our fair share in the total value capture.',
      },
      {
        glyph: 'layers',
        name: 'CAPTURE ECONOMICS',
        desc: 'VALUE MACROCOSM identified our biggest drivers of Value Value Capture. Now we translate into Lifetime Value Per Customer– our monetization roadmap.',
      },
      {
        glyph: 'layers',
        name: 'EFFICIENT SCALE',
        desc: 'In CAPTURE ECONOMICS, we plotted how to max Value Capture (Lifetime Value) per customer. Now we’re ready to scale– let’s plot how we acquire, retain and serve customers at maximum efficient scale.',
      },
      {
        glyph: 'layers',
        name: '100X ROI + IMPACT',
        desc: 'We’ve deconstructed and reconstructed all the pieces of our Meta Build. We’re now primed for the full J-Curve ride all the way to Escape Velocity. 100X Financial ROI commensurate with 100X impact on customers and markets– above all, a testament to 100X meta skills, discipline and OS.',
      },
    ],
  },
};

export const WEEK_TABS = ['Pre-expedition Week', 'Week 1', 'Week 2', 'Week 3'];
