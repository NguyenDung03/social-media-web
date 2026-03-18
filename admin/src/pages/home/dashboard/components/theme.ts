/* eslint-disable @typescript-eslint/no-explicit-any */
export const SPRING: any = { type: "spring", stiffness: 100, damping: 20 };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const STAGGER_TRANSITION: any = { staggerChildren: 0.1 };

// Simulated fonts since physical .ttf files aren't explicitly imported here
export const FONTS = {
  display: "'Instrument Serif', 'Playfair Display', 'Lyon Text', serif",
  sans: "'Geist Sans', 'Switzer', 'SF Pro Display', sans-serif",
  mono: "'Geist Mono', 'JetBrains Mono', monospace",
};
