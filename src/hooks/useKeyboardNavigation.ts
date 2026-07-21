import { KeyboardEvent } from "react";

interface UseKeyboardNavigationOptions {
  /** Czy element jest aktualnie rozwinięty/otwarty */
  isOpen: boolean;
  /** Enter/Space, gdy element jest zamknięty */
  onOpen: () => void;
  /** Escape, gdy element jest otwarty */
  onClose: () => void;
  /** ArrowRight, gdy element jest otwarty i ma nawigację */
  onNext: () => void;
  /** ArrowLeft, gdy element jest otwarty i ma nawigację */
  onPrev: () => void;
  /** Czy strzałki mają w ogóle coś robić (np. brak zdjęć w galerii = false) */
  hasNavigation?: boolean;
  /**
   * Czy Enter/Space wciśnięty, gdy element JEST JUŻ otwarty, ma go zamykać
   * (tak jak w TimelineEvent — to samo działanie co Escape).
   * Domyślnie false: Enter tylko otwiera, zamyka wyłącznie Escape
   * (tak jak w Gallery, żeby uniknąć natywnego "toggle" przycisku na klawiaturze).
   */
  enterTogglesClose?: boolean;
}

/**
 * Wspólna logika klawiatury dla wzorca "disclosure + roving arrows":
 * jeden fokusowalny trigger, Enter otwiera, strzałki przełączają zawartość
 * wewnątrz (bez przenoszenia fokusu), Escape zamyka i oddaje fokus triggerowi.
 * Używane przez TimelineEvent (kółko eventu) i Gallery (przycisk galerii).
 */
export function useKeyboardNavigation<T extends HTMLElement = HTMLElement>({
  isOpen,
  onOpen,
  onClose,
  onNext,
  onPrev,
  hasNavigation = true,
  enterTogglesClose = false,
}: UseKeyboardNavigationOptions) {
  return (e: KeyboardEvent<T>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) {
        onOpen();
      } else if (enterTogglesClose) {
        onClose();
      }
      return;
    }

    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      onClose();
      return;
    }

    if (isOpen && hasNavigation) {
      const arrowKeyHandlers: Record<string, () => void> = {
        ArrowRight: onNext,
        ArrowLeft: onPrev,
      };
      const handler = arrowKeyHandlers[e.key];
      if (handler) {
        e.preventDefault();
        handler();
      }
    }
  };
}
