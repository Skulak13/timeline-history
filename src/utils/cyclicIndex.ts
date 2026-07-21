// Cykliczne przesuwanie indeksu w tablicy o zadanej długości —
// używane wszędzie tam, gdzie strzałki klawiatury (lub kliknięcia) przełączają
// obrazy w galerii "w kółko" (po ostatnim wraca do pierwszego i odwrotnie).

export const getNextIndex = (current: number, length: number): number =>
  (current + 1) % length;

export const getPrevIndex = (current: number, length: number): number =>
  (current - 1 + length) % length;
