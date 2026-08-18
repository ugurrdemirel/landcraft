import type { SVGProps } from "react";

/**
 * Minimal 1.5px stroke icon set (Lucide/Heroicons inspired).
 * No emojis — the library ships a single, consistent icon vocabulary.
 *
 * Usage:
 *   <ArrowRight className="h-4 w-4" />
 */

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true as never,
};

export const ArrowRight = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const ArrowDown = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </svg>
);

export const ArrowUp = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 19V5" />
    <path d="m6 11 6-6 6 6" />
  </svg>
);

export const Check = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const Plus = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const X = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const Menu = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

export const ChevronDown = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRight = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronLeft = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);

export const Zap = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

export const ShieldCheck = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Layers = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m12 2 9 5-9 5-9-5 9-5z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
);

export const Smartphone = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect width="14" height="20" x="5" y="2" rx="2.5" />
    <path d="M12 18h.01" />
  </svg>
);

export const Gauge = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
    <path d="m12 14 4-4" />
    <path d="M12 10.5 9 13.5" />
  </svg>
);

export const BarChart = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M3 20h18" />
    <path d="M7 20V8" />
    <path d="M12 20V4" />
    <path d="M17 20v-7" />
  </svg>
);

export const Users = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const Star = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 2.5c.33 0 .63.19.77.5l1.98 4.01 4.42.64c.62.09.87.85.42 1.29l-3.2 3.12.76 4.4c.11.62-.55 1.1-1.1.8L12 15.13l-3.95 2.08c-.56.29-1.21-.18-1.1-.8l.76-4.4-3.2-3.12a.78.78 0 0 1 .42-1.29l4.42-.64L11.23 3c.14-.31.44-.5.77-.5z" />
  </svg>
);

export const Quote = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M10.5 5C7 5 4.5 7.5 4.5 11c0 3.3 2.2 5.5 5.2 5.5.2 0 .4 0 .5-.1-.2 1.5-1.3 2.6-2.9 3.2a.75.75 0 1 0 .4 1.4c3.6-1 5.8-3.8 5.8-7.7V7.5C13 6.1 11.9 5 10.5 5zm9 0C16 5 13.5 7.5 13.5 11c0 3.3 2.2 5.5 5.2 5.5.2 0 .4 0 .5-.1-.2 1.5-1.3 2.6-2.9 3.2a.75.75 0 1 0 .4 1.4c3.6-1 5.8-3.8 5.8-7.7V7.5C22 6.1 20.9 5 19.5 5z" />
  </svg>
);

export const Globe = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
  </svg>
);

export const Mail = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect width="18" height="14" x="3" y="5" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const Lock = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const Clock = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const DollarSign = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 2v20" />
    <path d="M17 5.5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const Code = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
  </svg>
);

export const Terminal = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m5 17 5-5-5-5" />
    <path d="M13 19h6" />
  </svg>
);

export const Send = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m3 11 18-8-7 18-3-7-8-3z" />
    <path d="M11 14 21 3" />
  </svg>
);

export const Play = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m8 5 11 7-11 7V5z" />
  </svg>
);

export const ExternalLink = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

export const Sliders = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 6h10" />
    <path d="M18 6h2" />
    <circle cx="16" cy="6" r="2" />
    <path d="M4 12h2" />
    <path d="M10 12h10" />
    <circle cx="8" cy="12" r="2" />
    <path d="M4 18h10" />
    <path d="M18 18h2" />
    <circle cx="16" cy="18" r="2" />
  </svg>
);

export const Database = (props: IconProps) => (
  <svg {...base} {...props}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v7c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12v7c0 1.66 3.58 3 8 3s8-1.34 8-3v-7" />
  </svg>
);

export const Box = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8z" />
    <path d="m3 8 9 5 9-5" />
    <path d="M12 13v8" />
  </svg>
);

export const Cpu = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect width="16" height="16" x="4" y="4" rx="2" />
    <rect width="8" height="8" x="8" y="8" rx="1" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>
);

export const Palette = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 3a9 9 0 1 0 0 18c1.66 0 2-1.34 2-2 0-.66-.27-1.16-.58-1.66-.3-.48-.42-.84-.42-1.34 0-.83.67-1.5 1.5-1.5h3.2A4.3 4.3 0 0 0 21 10 9 9 0 0 0 12 3z" />
    <circle cx="7.5" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="10.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const Rocket = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);