import OsMap, { type MapPhase } from '../components/OsMap';
import PhaseCard from '../components/PhaseStack';
import type { OsPhase } from '../data/os';

interface Props {
  phases: OsPhase[];
  mapPhases: MapPhase[];
  expandedId: string | null;
  activeId: string | null;
  progressPct: Record<string, number>;
  progressCount: Record<string, { done: number; total: number }>;
  flipped: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onFlipCard: (cardId: string) => void;
}

export default function StackSection(p: Props) {
  return (
    <section className="relative mx-auto max-w-[1200px] px-5 pb-24 sm:px-8">
      <div className="max-w-[640px]">
        <p className="eyebrow">One OS · five phases</p>
        <h2 className="mt-3 text-[34px] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-[44px]">
          The stack, dealt face-up.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-55">
          Every card starts white. Ship the work, flip it to black — the phase meter fills,
          the constellation lights, and the credential compounds. This homepage is the interface:
          try it below.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* constellation rail */}
        <div className="hidden lg:block">
          <div className="sticky top-[86px]">
            <OsMap
              phases={p.mapPhases}
              activeId={p.activeId}
              progress={p.progressPct}
              onSelect={p.onSelect}
              onHover={p.onHover}
            />
          </div>
        </div>

        {/* the deck */}
        <div className="space-y-[26px]">
          {p.phases.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              expanded={p.expandedId === phase.id}
              highlighted={p.activeId === phase.id}
              done={p.progressCount[phase.id]?.done ?? 0}
              total={p.progressCount[phase.id]?.total ?? 0}
              flipped={p.flipped}
              onToggle={() => p.onToggle(phase.id)}
              onFlipCard={p.onFlipCard}
              onHover={p.onHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
