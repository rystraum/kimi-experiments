import { motion } from 'framer-motion';

/** iOS-style segmented control — debossed track, raised sliding thumb */
export default function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="deboss inline-flex items-center rounded-full p-1" role="tablist" aria-label="OS mode">
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt)}
            className="relative rounded-full px-5 py-1.5 text-[14px] font-semibold outline-none transition-colors sm:px-7 sm:py-2 sm:text-[15px]"
            style={{ color: selected ? 'hsl(var(--ink))' : 'hsl(var(--ink) / 0.5)' }}
          >
            {selected && (
              <motion.span
                layoutId="seg-thumb"
                className="absolute inset-0 rounded-full"
                style={{
                  background: '#ffffff',
                  boxShadow: '0 1px 3px hsl(var(--ink) / 0.14), 0 4px 10px -6px hsl(var(--ink) / 0.18)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative z-10">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}
