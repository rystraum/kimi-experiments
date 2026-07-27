import { useState } from 'react';
import AppShell from '../components/shell/AppShell';

const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export default function GroundZero() {
  const [text, setText] = useState('');
  const [more, setMore] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const answered = words(text) > 0 ? 1 : 0;

  return (
    <AppShell crumbs={[{ label: 'Home', to: '/' }, { label: '02 Build-to-Skill', to: '/stacks/build-to-skill' }, { label: 'Ground Zero' }]}>
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-7 sm:px-8">
        <h1 className="font-serif text-[42px] font-bold uppercase leading-none tracking-[-0.01em] sm:text-[52px]">
          Ground Zero
        </h1>
        <p className="mt-4 max-w-[760px] font-serif text-[15px] leading-relaxed text-ink-70">
          Finally, you're in front of your dream investor. Or dream client. Or dream employer. What
          you write here (as in right here on this page) will get you the paycheck of your dreams.
          It's showtime: give us your best shot. Tell us all we need to know…{' '}
          {!more && (
            <button onClick={() => setMore(true)} className="font-semibold text-[hsl(var(--ink))] underline decoration-[hsl(var(--ink)/0.3)] underline-offset-2 hover:decoration-[hsl(var(--ink))]">
              Read more
            </button>
          )}
        </p>
        {more && (
          <p className="mt-2 max-w-[760px] font-serif text-[15px] leading-relaxed text-ink-55">
            This is the most words by far you'll ever get to write in the entire 100X universe —
            because everything after this must fit inside a 100-word discipline. Spend them well:
            the problem, the customer, the economics, the edge. If it can't survive here, it
            won't survive the stack.
          </p>
        )}

        <section className="mat-card mt-8 rounded-[20px] p-6 sm:p-8">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[14px] font-bold uppercase tracking-[0.06em]">Tell us what we need to know</h2>
            <span className="mono shrink-0 text-[11px] font-medium text-ink-40">800 words max</span>
          </div>

          <div className="mt-3 space-y-3 font-serif text-[14.5px] leading-relaxed text-ink-70">
            <p>
              Finally, you're in front of your dream investor. Or dream engagement. What you write
              here (as in right here on this page) will get you the paycheck of your dreams. It's
              showtime: give us your best shot.{' '}
              <strong className="font-semibold text-[hsl(var(--ink))]">
                Tell us what we need to know about your venture or project and why we should do a
                deal with you.
              </strong>{' '}
              Use your best judgement. We've intentionally kept this open-ended so you can write
              what you believe we need to know– the problem, your solution, the economics,
              scalability, etc.
            </p>
            <p>
              Ready, set, go. This is the most words by far you'll ever get to write in the entire
              100X universe.
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setSaved(false);
            }}
            rows={9}
            disabled={submitted}
            className="mt-5 w-full resize-y rounded-[14px] border border-[hsl(var(--ink)/0.1)] bg-white px-4 py-3 text-[14px] leading-relaxed outline-none transition-shadow placeholder:text-ink-40 focus:border-[hsl(var(--ink)/0.4)] focus:ring-4 focus:ring-[hsl(var(--ink)/0.1)] disabled:bg-[hsl(var(--tint)/0.5)]"
            placeholder="Write here…"
          />
          <div className="mono mt-1.5 text-[10.5px] font-medium text-ink-40">{words(text)} words</div>

          {/* footer */}
          <div className="hairline-t mt-5 flex flex-wrap items-center gap-4 pt-5">
            <span className="mono text-[11px] font-semibold text-ink-70">{answered}/1 answered</span>
            <span className="deboss h-[7px] min-w-[80px] flex-1 overflow-hidden rounded-full">
              <span
                className="block h-full rounded-full bg-[hsl(var(--green))] transition-all duration-500"
                style={{ width: `${answered * 100}%` }}
              />
            </span>
            <span className="mono text-[11px] font-medium text-ink-40">
              {submitted ? '0 submits left' : '1 submit left'}
            </span>
            <button
              onClick={() => setSaved(true)}
              disabled={!answered || submitted}
              className="btn-plate rounded-full px-5 py-2 text-[12.5px] font-semibold text-ink-70 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saved && !submitted ? 'Saved ✓' : 'Save'}
            </button>
            {submitted ? (
              <span className="flex items-center gap-1.5 rounded-full bg-[hsl(var(--green)/0.12)] px-5 py-2 text-[12.5px] font-semibold text-[hsl(var(--green))]">
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2.5 6.2 2.4 2.4 4.6-5" />
                </svg>
                In the black
              </span>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                disabled={!answered}
                className="btn-physical rounded-full px-6 py-2 text-[12.5px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                Submit
              </button>
            )}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
