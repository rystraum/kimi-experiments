import { useState } from 'react';
import AppShell from '../components/shell/AppShell';
import { WEEK_TABS } from '../data/stacks';

const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

/* ——— shared bits ——— */

function Field({
  label,
  hint,
  max,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  hint?: string;
  max: number;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-[12.5px] font-bold uppercase tracking-[0.05em]">{label}</h4>
        <span className="mono shrink-0 text-[10.5px] font-medium text-ink-40">{max} words max</span>
      </div>
      {hint && <p className="mt-1.5 font-serif text-[13.5px] leading-relaxed text-ink-55">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="mt-2.5 w-full resize-y rounded-[14px] border border-[hsl(var(--ink)/0.1)] bg-white px-4 py-3 text-[13.5px] leading-relaxed outline-none transition-shadow placeholder:text-ink-40 focus:border-[hsl(var(--ink)/0.4)] focus:ring-4 focus:ring-[hsl(var(--ink)/0.1)]"
        placeholder="Write here…"
      />
      <div className="mono mt-1 text-[10.5px] font-medium text-ink-40">{words(value)} words</div>
    </div>
  );
}

function LockNote() {
  return (
    <div className="flex items-center gap-2.5 rounded-[12px] border border-[hsl(4_55%_88%)] bg-[hsl(5_65%_97.5%)] px-4 py-2.5">
      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 shrink-0 text-[hsl(4_55%_48%)]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 1.5 13 12.5H1zM7 5.5v3M7 10.5v.01" />
      </svg>
      <p className="text-[12px] font-medium text-[hsl(4_50%_42%)]">
        This segment will be unlocked when Base Camp &amp; Orienteering have been completed for
        Expedition 2026
      </p>
    </div>
  );
}

function SectionCard({
  num,
  name,
  children,
}: {
  num: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mat-card rounded-[22px] p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="emboss-plate mono rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold text-ink-70">{num}</span>
        <h3 className="text-[15px] font-bold uppercase tracking-[0.06em]">{name}</h3>
      </div>
      {children}
    </section>
  );
}

function RadioRow({ label, checked, onSelect }: { label: string; checked: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      role="radio"
      aria-checked={checked}
      className={`flex w-full items-center gap-3 rounded-[14px] border px-4 py-3 text-left text-[13.5px] transition-all ${
        checked
          ? 'border-[hsl(var(--ink)/0.4)] bg-[hsl(var(--tint)/0.6)] font-medium'
          : 'border-[hsl(var(--ink)/0.08)] bg-white hover:border-[hsl(var(--ink)/0.18)]'
      }`}
    >
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full transition-all ${
          checked ? 'bg-[hsl(var(--ink))] shadow-[0_2px_6px_-2px_hsl(var(--ink)/0.6)]' : 'deboss'
        }`}
      >
        {checked && <span className="h-[7px] w-[7px] rounded-full bg-white" />}
      </span>
      {label}
    </button>
  );
}

/* ——— OKR builder ——— */

interface Objective {
  text: string;
  results: string[];
}

function OkrBuilder({
  objectives,
  onChange,
}: {
  objectives: Objective[];
  onChange: (o: Objective[]) => void;
}) {
  const update = (i: number, patch: Partial<Objective>) =>
    onChange(objectives.map((o, k) => (k === i ? { ...o, ...patch } : o)));

  return (
    <div className="space-y-3">
      {objectives.map((o, i) => (
        <div key={i} className="rounded-[16px] border border-[hsl(var(--ink)/0.08)] bg-[hsl(var(--tint)/0.35)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-55">Objective {i + 1}</span>
            {objectives.length > 1 && (
              <button
                onClick={() => onChange(objectives.filter((_, k) => k !== i))}
                className="rounded-full bg-[hsl(var(--destructive)/0.1)] px-2.5 py-1 text-[10.5px] font-semibold text-[hsl(var(--destructive))] transition-colors hover:bg-[hsl(var(--destructive)/0.16)]"
              >
                Remove
              </button>
            )}
          </div>
          <textarea
            value={o.text}
            onChange={(e) => update(i, { text: e.target.value })}
            rows={2}
            className="mt-2.5 w-full resize-y rounded-[12px] border border-[hsl(var(--ink)/0.1)] bg-white px-3.5 py-2.5 text-[13.5px] leading-relaxed outline-none transition-shadow placeholder:text-ink-40 focus:border-[hsl(var(--ink)/0.4)] focus:ring-4 focus:ring-[hsl(var(--ink)/0.1)]"
            placeholder="Objective…"
          />
          {o.results.map((r, j) => (
            <div key={j} className="mt-2 flex items-center gap-2">
              <span className="mono w-[46px] shrink-0 text-right text-[10px] font-semibold text-ink-40">KR {j + 1}</span>
              <input
                value={r}
                onChange={(e) =>
                  update(i, { results: o.results.map((x, k) => (k === j ? e.target.value : x)) })
                }
                className="w-full rounded-[10px] border border-[hsl(var(--ink)/0.1)] bg-white px-3 py-2 text-[13px] outline-none transition-shadow placeholder:text-ink-40 focus:border-[hsl(var(--ink)/0.4)] focus:ring-4 focus:ring-[hsl(var(--ink)/0.1)]"
                placeholder="Key result…"
              />
              <button
                onClick={() => update(i, { results: o.results.filter((_, k) => k !== j) })}
                className="shrink-0 text-ink-40 transition-colors hover:text-[hsl(var(--destructive))]"
                aria-label="Remove key result"
              >
                <svg viewBox="0 0 10 10" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="m2 2 6 6M8 2l-6 6" />
                </svg>
              </button>
            </div>
          ))}
          {o.results.length < 3 && (
            <button
              onClick={() => update(i, { results: [...o.results, ''] })}
              className="btn-plate mt-2.5 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold text-ink-70"
            >
              Add Key Result
            </button>
          )}
        </div>
      ))}
      {objectives.length < 3 && (
        <button
          onClick={() => onChange([...objectives, { text: '', results: [] }])}
          className="btn-plate rounded-full px-4 py-2 text-[12px] font-semibold text-ink-70"
        >
          Add Objective
        </button>
      )}
    </div>
  );
}

/* ——— page ——— */

export default function WeeklyExecution() {
  const [tab, setTab] = useState(WEEK_TABS[0]);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [objectives, setObjectives] = useState<Objective[]>([{ text: '', results: [] }]);
  const [learnAbout, setLearnAbout] = useState<number | null>(null);
  const [share, setShare] = useState<number | null>(null);

  const set = (id: string) => (v: string) => setFields((f) => ({ ...f, [id]: v }));

  return (
    <AppShell crumbs={[{ label: 'Home', to: '/' }, { label: '02 Build-to-Skill', to: '/stacks/build-to-skill' }, { label: 'Weekly Execution' }]}>
      <main className="mx-auto max-w-[1080px] px-5 pb-24 pt-7 sm:px-8">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="font-serif text-[40px] font-bold uppercase leading-none tracking-[-0.01em] sm:text-[50px]">
              Weekly Execution
            </h1>
            <p className="mt-3 max-w-[640px] font-serif text-[14.5px] leading-relaxed text-ink-55">
              Weekly execution sprint: set OKRs, harvest BTL learnings, and compound leverage every
              week.
            </p>
          </div>
          <div className="flex items-stretch gap-2.5">
            <div className="deboss rounded-[16px] px-5 py-3 text-center">
              <div className="tnum text-[24px] font-bold leading-none">
                0 <span className="font-medium text-ink-40">|</span> 0
              </div>
              <div className="eyebrow mt-1.5 !text-[9px]">Current</div>
            </div>
            <div className="deboss rounded-[16px] px-5 py-3 text-center">
              <div className="tnum text-[24px] font-bold leading-none">0</div>
              <div className="eyebrow mt-1.5 !text-[9px]">Inflection</div>
            </div>
          </div>
        </div>

        {/* week tabs */}
        <div className="hairline-b mt-7 flex gap-1 overflow-x-auto">
          {WEEK_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative whitespace-nowrap px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                tab === t ? 'text-[hsl(var(--ink))]' : 'text-ink-55 hover:text-[hsl(var(--ink))]'
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-3 -bottom-px h-[2.5px] rounded-full bg-[hsl(var(--ink))]" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-7 space-y-6">
          {/* ——— 01 OKR ——— */}
          <SectionCard num="01" name="OKR">
            <div className="space-y-6">
              <LockNote />
              <Field
                label="Headline"
                hint="In 1-2 sentences, with clarity and conviction, let's state our top execution priorities in the next 30-60-90 days."
                max={50}
                value={fields.headline ?? ''}
                onChange={set('headline')}
              />
              <Field
                label="Key Shifts"
                hint="In 1-2 sentences, let's state key shifts, if any, in our OKRs (vs last OKR)"
                max={50}
                value={fields.shifts ?? ''}
                onChange={set('shifts')}
              />
              <div>
                <h4 className="text-[12.5px] font-bold uppercase tracking-[0.05em]">OKR this week</h4>
                <p className="mt-1.5 font-serif text-[13.5px] leading-relaxed text-ink-55">
                  We follow the 3 x 3 x 3 Rule of OKRs. We focus on up to 3 Objectives, with up to
                  3 Key Results per Objective, with up to 3 Key Actions per Key Result. Weekly OKRs
                  are all about sequence, prioritization and singular focus. Where are we this
                  week? Which <strong>Build Stacks</strong> (Entry Micro, Value Macro, Capture
                  Economics, Efficient Scale, 100X End Game) currently demands to be validated
                  (Traction) before moving forward?
                </p>
                <div className="mt-3">
                  <OkrBuilder objectives={objectives} onChange={setObjectives} />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ——— 02 BTL DIVIDEND ——— */}
          <SectionCard num="02" name="BTL Dividend">
            <div className="space-y-6">
              <LockNote />
              <div>
                <h4 className="text-[12.5px] font-bold uppercase tracking-[0.05em] text-ink-70">BTL last week</h4>
                <div className="mt-4 space-y-6">
                  <Field label="OKR-driven target win for the week" max={20} value={fields.win ?? ''} onChange={set('win')} rows={2} />
                  <Field label="Key build/implementation/iteration" max={20} value={fields.build ?? ''} onChange={set('build')} rows={2} />
                  <Field label="Key gains" max={20} value={fields.gains ?? ''} onChange={set('gains')} rows={2} />
                  <Field label="Key drains" max={20} value={fields.drains ?? ''} onChange={set('drains')} rows={2} />
                  <Field label="Next target win" max={20} value={fields.nextWin ?? ''} onChange={set('nextWin')} rows={2} />
                  <Field label="Next key build/implementation/iteration" max={20} value={fields.nextBuild ?? ''} onChange={set('nextBuild')} rows={2} />
                  <Field label="OKRs impact" max={20} value={fields.impact ?? ''} onChange={set('impact')} rows={2} />
                </div>
              </div>

              <div className="hairline-t pt-6">
                <h4 className="text-[12.5px] font-bold uppercase tracking-[0.05em] text-ink-70">Learning dividends</h4>
                <div className="mt-4">
                  <h5 className="text-[12px] font-bold uppercase tracking-[0.05em]">Key learnings about</h5>
                  <div className="mt-2.5 space-y-2">
                    {['My Venture', '100X Process', 'Others'].map((l, i) => (
                      <RadioRow key={l} label={l} checked={learnAbout === i} onSelect={() => setLearnAbout(i)} />
                    ))}
                  </div>
                </div>
                <div className="mt-6 space-y-6">
                  <Field label="What I learned" max={100} value={fields.learned ?? ''} onChange={set('learned')} />
                  <Field label="What changes going forward" max={100} value={fields.changes ?? ''} onChange={set('changes')} />
                  <Field label="Most important impact" max={100} value={fields.mostImpact ?? ''} onChange={set('mostImpact')} />
                </div>
                <div className="mt-6">
                  <h5 className="text-[12px] font-bold uppercase tracking-[0.05em]">Share this key learning</h5>
                  <div className="mt-2.5 space-y-2">
                    {['I agree to share this Key Learning in our Community Learning Feed', "I'd rather keep this Key Learning to myself"].map((l, i) => (
                      <RadioRow key={l} label={l} checked={share === i} onSelect={() => setShare(i)} />
                    ))}
                  </div>
                </div>
                <div className="mt-6 rounded-[12px] border border-[hsl(var(--ink)/0.08)] bg-[hsl(var(--tint)/0.5)] px-4 py-3">
                  <p className="font-serif text-[13px] italic text-ink-70">
                    Always loop Learning Dividends back into your Build Stack (Strategics, Traction,
                    Inflections)
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </main>
    </AppShell>
  );
}
