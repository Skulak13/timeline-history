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
 * - ekran dotykowy (pointer: coarse) — wyklucza deskopy ze zmniejszonym oknem przeglądarki
 *
 * Dlaczego nowe progi (1130 × 780)?
 * Poprzednie progi (940 × 520) obejmowały tylko smartfony.
 * Podniesienie progów pozwala objąć również tablety, które w landscape
 * są zbyt małe na desktopowy układ osi czasu (bloki nad/pod osią),
 * ale zbyt duże, żeby stary próg je wykrył:
 *
 *   iPad Mini landscape:    1024 × 768  → nie mieścił się w 940 × 520
 *   Surface Duo landscape:  1114 × 720  → nie mieścił się w 940 × 520
 *
 * Warunek (pointer: coarse) chroni przed sytuacją, w której użytkownik
 * desktopu zmniejszy okno przeglądarki do rozmiarów pokrywających się
 * z powyższymi progami — mysz ma pointer: fine, więc warunek odpada.
 */
export const MOBILE_LANDSCAPE_BREAKPOINT = {
  /** Maksymalna szerokość dla mobile landscape (px) — obejmuje iPad Mini (1024) i Surface Duo (1114) */
  MAX_WIDTH: 1130,

  /** Maksymalna wysokość dla mobile landscape (px) — obejmuje iPad Mini (768) i Surface Duo (720) */
  MAX_HEIGHT: 780,
} as const;
