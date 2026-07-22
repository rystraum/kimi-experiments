import type { ReactNode } from 'react';

const GLYPHS: Record<string, ReactNode> = {
  video: (
    <>
      <rect x="6.5" y="9" width="13" height="10" rx="2.5" fill="none" stroke="#fff" strokeWidth="1.8" />
      <path d="M19.5 12.2 24 9.6v8.8l-4.5-2.6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
    </>
  ),
  yoda: (
    <text x="16" y="21.5" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="inherit">
      Y
    </text>
  ),
  chart: (
    <>
      <path d="M8 24h16" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="9.5" y="14" width="3.4" height="8" rx="1.2" fill="#fff" />
      <rect x="14.8" y="10" width="3.4" height="12" rx="1.2" fill="#fff" />
      <rect x="20.1" y="16.5" width="3.4" height="5.5" rx="1.2" fill="#fff" />
    </>
  ),
  book: (
    <>
      <path d="M16 10.5c-2-1.6-4.6-2-7-1.4v13c2.4-.6 5-.2 7 1.4 2-1.6 4.6-2 7-1.4v-13c-2.4-.6-5-.2-7 1.4Z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M16 10.5v13" stroke="#fff" strokeWidth="1.8" />
    </>
  ),
  compass: (
    <>
      <circle cx="16" cy="16" width="22" height="22" r="9.5" fill="none" stroke="#fff" strokeWidth="1.8" />
      <path d="m19.8 12.2-2.3 5.3-5.3 2.3 2.3-5.3 5.3-2.3Z" fill="#fff" />
    </>
  ),
};

/** Skeuomorphic iOS-style squircle app icon with gloss + line glyph */
export default function AppIcon({
  glyph,
  hue,
  size = 44,
}: {
  glyph: string;
  hue: [string, string];
  size?: number;
}) {
  return (
    <span
      className="app-icon inline-flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(160deg, ${hue[0]} 0%, ${hue[1]} 100%)`,
      }}
    >
      <svg viewBox="0 0 32 32" width={size * 0.72} height={size * 0.72} aria-hidden="true">
        {GLYPHS[glyph]}
      </svg>
    </span>
  );
}
