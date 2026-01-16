/**
 * Breakpointy dla wykrywania mobile landscape.
 *
 * Te wartości są zsynchronizowane z media query w globals.css:
 * @media (orientation: landscape) and (max-width: 940px) and (max-height: 520px)
 *
 * Mobile landscape to urządzenia, które spełniają:
 * - szerokość <= MAX_WIDTH
 * - wysokość <= MAX_HEIGHT
 * - orientacja landscape (width > height)
 */
export const MOBILE_LANDSCAPE_BREAKPOINT = {
  /** Maksymalna szerokość dla mobile landscape (px) */
  MAX_WIDTH: 940,

  /** Maksymalna wysokość dla mobile landscape (px) */
  MAX_HEIGHT: 520,
} as const;
