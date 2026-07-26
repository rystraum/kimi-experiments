import type { ReactNode } from 'react';

const GLYPHS: Record<string, ReactNode> = {
  video: (
    <>
      <rect x="6.5" y="9" width="13" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19.5 12.2 24 9.6v8.8l-4.5-2.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </>
  ),
  yoda: (
    <text x="16" y="21" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor" fontFamily="inherit">
      Y
    </text>
  ),
  chart: (
    <>
      <path d="M8 24h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11 21v-6M16.5 21V11M22 21v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  book: (
    <>
      <path d="M16 10.5c-2-1.6-4.6-2-7-1.4v13c2.4-.6 5-.2 7 1.4 2-1.6 4.6-2 7-1.4v-13c-2.4-.6-5-.2-7 1.4Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 10.5v13" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
  compass: (
    <>
      <circle cx="16" cy="16" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="m19.8 12.2-2.3 5.3-5.3 2.3 2.3-5.3 5.3-2.3Z" fill="currentColor" />
    </>
  ),
};

/**
 * Monochrome instrument glyph — a warm paper chip with a thin ink mark.
 * Deliberately quiet: icons are geometry, not decoration.
 */
export default function AppIcon({
  glyph,
  size = 44,
}: {
  glyph: string;
  hue?: [string, string]; // retained for data compatibility, intentionally unused
  size?: number;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[27%] border border-[hsl(var(--ink)/0.08)] bg-[#f2f1ec] text-[hsl(var(--ink))]"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 32 32" width={size * 0.68} height={size * 0.68} aria-hidden="true">
        {GLYPHS[glyph]}
      </svg>
    </span>
  );
}
