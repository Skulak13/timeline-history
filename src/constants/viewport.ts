/**
 * Breakpointy dla wykrywania mobile landscape.
 *
 * Te wartości są zsynchronizowane z media query w globals.css:
 * @media (orientation: landscape) and (max-width: 1130px) and (max-height: 780px) and (pointer: coarse)
 *
 * Mobile landscape to urządzenia, które spełniają WSZYSTKIE poniższe warunki:
 * - szerokość <= MAX_WIDTH
 * - wysokość <= MAX_HEIGHT
 * - orientacja landscape (width > height)
 *
 */
export const MOBILE_LANDSCAPE_BREAKPOINT = {
  /** Maksymalna szerokość dla mobile landscape (px) — obejmuje iPad Mini (1024) i Surface Duo (1114) */
  MAX_WIDTH: 1130,

  /** Maksymalna wysokość dla mobile landscape (px) — obejmuje iPad Mini (768) i Surface Duo (720) */
  MAX_HEIGHT: 780,
} as const;
