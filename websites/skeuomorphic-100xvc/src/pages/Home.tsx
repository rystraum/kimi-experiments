import { useMemo, useState } from 'react';
import Nav from '../sections/Nav';
import Hero from '../sections/Hero';
import StackSection from '../sections/StackSection';
import Footer from '../sections/Footer';
import { PHASES, phaseCardCount } from '../data/os';
import type { MapPhase } from '../components/OsMap';

export default function Home() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [expandedId, setExpandedId] = useState<string | null>('entry');
  const [hoverId, setHoverId] = useState<string | null>(null);

  const activeId = hoverId ?? expandedId;

  const progressCount = useMemo(() => {
    const out: Record<string, { done: number; total: number }> = {};
    for (const ph of PHASES) {
      const total = phaseCardCount(ph);
      const done = ph.groups.reduce(
        (n, g) => n + g.cards.filter((c) => flipped[c.id]).length,
        0,
      );
      out[ph.id] = { done, total };
    }
    return out;
  }, [flipped]);

  const progressPct = useMemo(() => {
    const out: Record<string, number> = {};
    for (const [k, v] of Object.entries(progressCount)) {
      out[k] = v.total === 0 ? 0 : v.done / v.total;
    }
    return out;
  }, [progressCount]);

  const mapPhases: MapPhase[] = useMemo(
    () =>
      PHASES.map((ph) => ({
        id: ph.id,
        num: ph.num,
        name: ph.name,
        count: phaseCardCount(ph),
        locked: ph.comingSoon,
      })),
    [],
  );

  const togglePhase = (id: string) => setExpandedId((cur) => (cur === id ? null : id));

  const selectPhase = (id: string) => {
    const phase = PHASES.find((ph) => ph.id === id);
    if (!phase || phase.comingSoon) return;
    setExpandedId(id);
    requestAnimationFrame(() => {
      document.getElementById(`phase-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const flipCard = (cardId: string) =>
    setFlipped((cur) => ({ ...cur, [cardId]: !cur[cardId] }));

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <StackSection
          phases={PHASES}
          mapPhases={mapPhases}
          expandedId={expandedId}
          activeId={activeId}
          progressPct={progressPct}
          progressCount={progressCount}
          flipped={flipped}
          onToggle={togglePhase}
          onSelect={selectPhase}
          onHover={setHoverId}
          onFlipCard={flipCard}
        />
      </main>
      <Footer />
    </div>
  );
}
