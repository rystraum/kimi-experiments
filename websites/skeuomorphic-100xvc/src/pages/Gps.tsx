import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import AppSidebar from '../components/AppSidebar';

/* ———————————————— content model ———————————————— */

const COORDINATES = [
  "I'm open to anything right now",
  'I have an idea and want to sharpen &/or confirm it',
  "I'm already working on something and want to deepen &/or refocus",
  "I've lost the loving feeling, need to find my way back",
  'Others (pls describe)',
];

interface Q {
  id: string;
  label: string;
  desc: string;
  max: number;
}

const PERSONAL: Q[] = [
  {
    id: 'genius',
    label: 'Genius',
    max: 100,
    desc: 'We live in a world punctuated by constant change. What is it in me that is good, that is gifted, that remains in me no matter how much the world or circumstances change, that allows me to stay relevant and keep being a force for good?',
  },
  {
    id: 'purpose',
    label: 'Purpose',
    max: 100,
    desc: 'What pains have I experienced most meaningfully in my own life? How have my pains become a gift — because they allowed me to care deeply about something bigger than self? What pains do I know deepest because I have experienced them deepest — to a point where they have become the deepest, most powerful source and fuel of purpose in my life? How have my pains moved me to Empathy? To Compassion? To Love?',
  },
  {
    id: 'service',
    label: 'Service',
    max: 100,
    desc: 'Beyond the easy answer of my inner circle of family and friends: Who are the people whose pains I encounter most meaningfully in my life? What are their pains that nag or gnaw at me? Who/What is this slice of humanity entrusted to me, whose pains I am gifted and compelled to heal?',
  },
];

const VENTURE: Q[] = [
  {
    id: 'problem',
    label: 'Problem you want to solve',
    max: 100,
    desc: 'Describe the problem you want to solve.',
  },
  {
    id: 'power-customer',
    label: 'Power Customer you want to serve',
    max: 100,
    desc: "Describe the most important customers who will drive your most significant usage and market impact. Don't just label them (gender, age, socio-economics, etc.). Beyond demographics, the most critical insight about your Power Customer is your grasp of what it is about them — their defining characteristic/s — that will make them need your solution again and again.",
  },
  {
    id: 'power-pain',
    label: 'Power Pain you want to solve',
    max: 100,
    desc: 'Reflecting on their current or status quo UX, including all the solutions and alternatives available, describe the 10–20% most important fails driving 80% of the pains of your Power Customer.',
  },
  {
    id: 'power-impact',
    label: 'Power Impact you want to deliver',
    max: 100,
    desc: 'Why is this Delta (change before vs after) meaningfully important to your power customer? How important is it in the grand scheme of their lives?',
  },
  {
    id: 'magis',
    label: 'Magis',
    max: 100,
    desc: 'Latin for pushing the envelope, striving for more — driven, not by ambition, but by a higher purpose. How might I push the envelope on the relevance and impact of my mission, outcomes, impact?',
  },
  {
    id: 'alignment',
    label: 'Alignment',
    max: 100,
    desc: "Reflecting on my GPS vs actual mission (work, venture, project, etc) I'm currently occupied with: where/what are the key gaps &/or misalignments? What can I do/change to achieve better alignment, live my deeper truth so as to fulfill my highest purpose and greatest promise?",
  },
];

const DOUBT: Q[] = [
  {
    id: 'journal',
    label: 'Journal',
    max: 100,
    desc: "Journal here when you have moments of doubt, when you're stuck and trying to find a way forward. Describe how you're feeling. What triggers your current state?",
  },
  {
    id: 'path-forward',
    label: 'Path Forward',
    max: 100,
    desc: 'Go back to your Personal and/or Venture GPS. Somewhere in those variables is your path to grit and resilience — your path forward. Will you find it in your Genius, Purpose or Service? Or in your Shared Mission — the People, Pains and Vision of Delta and Impact you want to realize?',
  },
];

const ANCHORS = [
  { id: 'start-here', num: '00', label: 'Start Here' },
  { id: 'personal-gps', num: '01', label: 'Personal GPS' },
  { id: 'venture-gps', num: '02', label: 'Venture GPS' },
  { id: 'doubt-grit', num: '03', label: 'Doubt & Grit' },
];

const TABS = ['Meta', 'WTB?', 'Traction', 'Inflection -1'];

/* ———————————————— helpers ———————————————— */

const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

/* ———————————————— small pieces ———————————————— */

function TextQuestion({
  q,
  value,
  onChange,
}: {
  q: Q;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-[13px] font-bold uppercase tracking-[0.05em]">{q.label}</h4>
        <span className="mono shrink-0 text-[10.5px] font-medium text-ink-40">{q.max} words max</span>
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-55">{q.desc}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-3 w-full resize-y rounded-[14px] border border-[hsl(var(--ink)/0.1)] bg-white px-4 py-3 text-[13.5px] leading-relaxed text-[hsl(var(--ink))] outline-none transition-shadow placeholder:text-ink-40 focus:border-[hsl(var(--blue)/0.5)] focus:ring-4 focus:ring-[hsl(var(--blue)/0.12)]"
        placeholder="Write here…"
      />
      <div className="mono mt-1.5 text-[10.5px] font-medium text-ink-40">{words(value)} words</div>
    </div>
  );
}

function SectionFooter({
  answered,
  total,
  submitted,
  onSubmit,
}: {
  answered: number;
  total: number;
  submitted: boolean;
  onSubmit: () => void;
}) {
  const pct = total === 0 ? 0 : Math.round((answered / total) * 100);
  return (
    <div className="mt-7">
      <div className="flex items-center gap-4">
        <span className="mono shrink-0 text-[11px] font-semibold text-ink-70">
          {answered} of {total} questions answered
        </span>
        <span className="deboss h-[7px] flex-1 overflow-hidden rounded-full">
          <span
            className="block h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.max(pct, answered > 0 ? 3 : 0)}%`,
              background: submitted ? 'hsl(var(--green))' : 'hsl(var(--blue))',
            }}
          />
        </span>
        {submitted ? (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[hsl(var(--green)/0.12)] px-4 py-2 text-[12.5px] font-semibold text-[hsl(var(--green))]">
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m2.5 6.2 2.4 2.4 4.6-5" />
            </svg>
            In the black
          </span>
        ) : (
          <button
            onClick={onSubmit}
            disabled={answered === 0}
            className="btn-physical shrink-0 rounded-full px-5 py-2 text-[12.5px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            Submit Card
          </button>
        )}
      </div>
    </div>
  );
}

function SectionCard({
  id,
  num,
  name,
  children,
}: {
  id: string;
  num: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mat-card scroll-mt-8 rounded-[22px] p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="emboss-plate mono rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-ink-70">
          {num}
        </span>
        <h3 className="text-[15px] font-bold uppercase tracking-[0.06em]">{name}</h3>
      </div>
      {children}
    </section>
  );
}

/* ———————————————— page ———————————————— */

export default function Gps() {
  const [tab, setTab] = useState('Meta');
  const [coord, setCoord] = useState<number | null>(2);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [deltaBefore, setDeltaBefore] = useState('');
  const [deltaAfter, setDeltaAfter] = useState('');
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [activeAnchor, setActiveAnchor] = useState('start-here');

  const set = (id: string) => (v: string) => setAnswers((a) => ({ ...a, [id]: v }));
  const answeredIn = (qs: Q[]) => qs.filter((q) => words(answers[q.id] ?? '') > 0).length;

  const ventureAnswered =
    answeredIn(VENTURE) + (words(deltaBefore) > 0 || words(deltaAfter) > 0 ? 1 : 0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveAnchor(e.target.id)),
      { rootMargin: '-25% 0px -65% 0px' },
    );
    ANCHORS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [tab]);

  return (
    <div className="min-h-screen">
      <AppSidebar />

      <main className="mx-auto max-w-[1160px] px-5 pb-24 pt-10 sm:px-8 md:pl-[260px] md:pr-8">
        {/* mobile home link (sidebar hidden) */}
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[hsl(var(--blue))] md:hidden">
          ← 100X OS Home
        </Link>

        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-[620px]">
            <h1 className="text-[44px] font-extrabold leading-none tracking-[-0.04em] sm:text-[56px]">GPS</h1>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-55">
              Complete this Stack to activate one of the world&rsquo;s most powerful GPS systems —
              to set direction, navigation, clarity, depth, velocity, grit and staying power for
              your life&rsquo;s most important endeavors.
            </p>
          </div>

          {/* score wells */}
          <div className="flex items-stretch gap-2.5">
            <div className="deboss rounded-[16px] px-5 py-3 text-center">
              <div className="tnum text-[24px] font-bold leading-none tracking-[-0.02em]">
                −1 <span className="font-medium text-ink-40">|</span> 18
              </div>
              <div className="eyebrow mt-1.5 !text-[9px]">Current</div>
            </div>
            <div className="deboss rounded-[16px] px-5 py-3 text-center">
              <div className="tnum text-[24px] font-bold leading-none text-[hsl(var(--amber))]">−1</div>
              <div className="eyebrow mt-1.5 !text-[9px]">Bonus</div>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="hairline-b mt-8 flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative whitespace-nowrap px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                tab === t ? 'text-[hsl(var(--blue))]' : 'text-ink-55 hover:text-[hsl(var(--ink))]'
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-3 -bottom-px h-[2.5px] rounded-full bg-[hsl(var(--blue))]" />
              )}
            </button>
          ))}
        </div>

        {tab !== 'Meta' ? (
          <div className="deboss mt-8 rounded-[18px] px-6 py-10 text-center">
            <p className="text-[14px] font-semibold">This view is still sealed.</p>
            <p className="mt-1.5 text-[12.5px] text-ink-55">
              Complete the GPS Meta stack — your {tab} signals unlock as cards flip to black.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[168px_minmax(0,1fr)]">
            {/* anchor nav */}
            <div className="hidden lg:block">
              <div className="sticky top-8 flex flex-col gap-1">
                {ANCHORS.map((a) => (
                  <a
                    key={a.id}
                    href={`#${a.id}`}
                    className={`flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[12.5px] transition-colors ${
                      activeAnchor === a.id
                        ? 'bg-[hsl(var(--tint))] font-semibold text-[hsl(var(--blue))]'
                        : 'font-medium text-ink-55 hover:text-[hsl(var(--ink))]'
                    }`}
                  >
                    <span className={`mono text-[10px] font-semibold ${activeAnchor === a.id ? '' : 'text-ink-40'}`}>
                      {a.num}
                    </span>
                    {a.label}
                  </a>
                ))}
              </div>
            </div>

            {/* form stack */}
            <div className="space-y-6">
              {/* 00 START HERE */}
              <SectionCard id="start-here" num="00" name="Start Here">
                <h4 className="text-[13px] font-bold uppercase tracking-[0.05em]">Set your coordinates</h4>
                <p className="mt-1.5 text-[13px] text-ink-55">
                  Let&rsquo;s start by setting your coordinates. Select the statement that best
                  describes you.
                </p>
                <div className="mt-4 space-y-2">
                  {COORDINATES.map((c, i) => {
                    const selected = coord === i;
                    return (
                      <button
                        key={c}
                        onClick={() => setCoord(i)}
                        className={`flex w-full items-center gap-3 rounded-[14px] border px-4 py-3 text-left text-[13.5px] transition-all ${
                          selected
                            ? 'border-[hsl(var(--blue)/0.45)] bg-[hsl(var(--tint)/0.6)] font-medium'
                            : 'border-[hsl(var(--ink)/0.08)] bg-white hover:border-[hsl(var(--ink)/0.18)]'
                        }`}
                        role="radio"
                        aria-checked={selected}
                      >
                        <span
                          className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full transition-all ${
                            selected ? 'bg-[hsl(var(--blue))] shadow-[0_2px_6px_-2px_hsl(var(--blue)/0.7)]' : 'deboss'
                          }`}
                        >
                          {selected && <span className="h-[7px] w-[7px] rounded-full bg-white" />}
                        </span>
                        {c}
                      </button>
                    );
                  })}
                </div>
                <SectionFooter
                  answered={coord === null ? 0 : 1}
                  total={1}
                  submitted={!!submitted['start-here']}
                  onSubmit={() => setSubmitted((s) => ({ ...s, 'start-here': true }))}
                />
              </SectionCard>

              {/* 01 PERSONAL GPS */}
              <SectionCard id="personal-gps" num="01" name="Personal GPS">
                <div className="space-y-7">
                  {PERSONAL.map((q) => (
                    <TextQuestion key={q.id} q={q} value={answers[q.id] ?? ''} onChange={set(q.id)} />
                  ))}
                </div>
                <SectionFooter
                  answered={answeredIn(PERSONAL)}
                  total={PERSONAL.length}
                  submitted={!!submitted['personal-gps']}
                  onSubmit={() => setSubmitted((s) => ({ ...s, 'personal-gps': true }))}
                />
              </SectionCard>

              {/* 02 VENTURE GPS */}
              <SectionCard id="venture-gps" num="02" name="Venture GPS">
                <div className="space-y-7">
                  {VENTURE.slice(0, 2).map((q) => (
                    <TextQuestion key={q.id} q={q} value={answers[q.id] ?? ''} onChange={set(q.id)} />
                  ))}

                  {/* power delta — before / after */}
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-[13px] font-bold uppercase tracking-[0.05em]">
                        Power Delta you want to deliver
                      </h4>
                      <span className="mono shrink-0 text-[10.5px] font-medium text-ink-40">
                        50 words max each
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-55">
                      Delta means change. Describe your vision of what changes for your Power
                      Customer before vs after your solution.
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[16px] border border-[hsl(4_60%_88%)] bg-[hsl(5_65%_97.5%)] p-4">
                        <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[hsl(4_55%_45%)]">
                          Before (From)
                        </span>
                        <textarea
                          value={deltaBefore}
                          onChange={(e) => setDeltaBefore(e.target.value)}
                          rows={4}
                          className="mt-2 w-full resize-y rounded-[10px] border border-[hsl(4_50%_88%)] bg-white/80 px-3 py-2.5 text-[13px] leading-relaxed outline-none transition-shadow focus:border-[hsl(4_55%_60%)] focus:ring-4 focus:ring-[hsl(4_60%_50%/0.1)]"
                          placeholder="Status quo…"
                        />
                        <div className="mono mt-1.5 text-[10.5px] font-medium text-[hsl(4_40%_55%)]">
                          {words(deltaBefore)} words
                        </div>
                      </div>
                      <div className="rounded-[16px] border border-[hsl(150_40%_86%)] bg-[hsl(148_45%_96.5%)] p-4">
                        <span className="text-[11.5px] font-bold uppercase tracking-[0.06em] text-[hsl(152_55%_30%)]">
                          After (To)
                        </span>
                        <textarea
                          value={deltaAfter}
                          onChange={(e) => setDeltaAfter(e.target.value)}
                          rows={4}
                          className="mt-2 w-full resize-y rounded-[10px] border border-[hsl(150_35%_85%)] bg-white/80 px-3 py-2.5 text-[13px] leading-relaxed outline-none transition-shadow focus:border-[hsl(152_50%_40%)] focus:ring-4 focus:ring-[hsl(150_50%_40%/0.1)]"
                          placeholder="The 10X change…"
                        />
                        <div className="mono mt-1.5 text-[10.5px] font-medium text-[hsl(150_30%_45%)]">
                          {words(deltaAfter)} words
                        </div>
                      </div>
                    </div>
                  </div>

                  {VENTURE.slice(2).map((q) => (
                    <TextQuestion key={q.id} q={q} value={answers[q.id] ?? ''} onChange={set(q.id)} />
                  ))}
                </div>
                <SectionFooter
                  answered={ventureAnswered}
                  total={VENTURE.length + 1}
                  submitted={!!submitted['venture-gps']}
                  onSubmit={() => setSubmitted((s) => ({ ...s, 'venture-gps': true }))}
                />
              </SectionCard>

              {/* 03 DOUBT & GRIT */}
              <SectionCard id="doubt-grit" num="03" name="Doubt & Grit">
                <div className="space-y-7">
                  {DOUBT.map((q) => (
                    <TextQuestion key={q.id} q={q} value={answers[q.id] ?? ''} onChange={set(q.id)} />
                  ))}
                </div>
                <SectionFooter
                  answered={answeredIn(DOUBT)}
                  total={DOUBT.length}
                  submitted={!!submitted['doubt-grit']}
                  onSubmit={() => setSubmitted((s) => ({ ...s, 'doubt-grit': true }))}
                />
              </SectionCard>

              <p className="pb-2 text-center text-[11.5px] text-ink-40">
                Every answered question feeds your GPS score — and flips this stack to black.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
