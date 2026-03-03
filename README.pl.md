# Timeline History - The Way to Code!

**🚀 [Zobacz wersję Demo](https://timeline-history-lilac.vercel.app/)**

<br>

**Autor:** Tomek Skulski ([@Skulak13](https://github.com/Skulak13))  
**Kontakt:** [LinkedIn](https://linkedin.com/in/tomasz-skulski) | [GitHub](https://github.com/Skulak13) | [Codewars](https://www.codewars.com/users/Skulak13)

<br>

> 🇬🇧 **[English version / Wersja angielska](README.md)**

## Spis treści

1. [Przegląd projektu](#przegląd-projektu)
2. [Funkcjonalności](#funkcjonalności)
3. [Technologie](#technologie)
4. [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
5. [Struktura projektu](#struktura-projektu)
6. [Główne komponenty](#główne-komponenty)
7. [🌟 Czego nauczył mnie projekt Timeline History](#-czego-nauczył-mnie-projekt-timeline-history---wnioski-z-projektu)
8. [Responsive Design](#responsive-design)
9. [Customowe hooki](#customowe-hooki)
10. [Konfiguracja](#konfiguracja)
11. [Optymalizacje](#optymalizacje)
12. [Interakcje i dostępność](#interakcje-i-dostępność)
13. [Stylowanie](#stylowanie)
14. [Skrypty npm](#skrypty-npm)

---

## Przegląd projektu

**Timeline History** to interaktywna aplikacja webowa przedstawiająca moją osobistą drogę do programowania. Projekt został stworzony jako portfolio prezentujące doświadczenia życiowe w atrakcyjny wizualnie i angażujący sposób, z naciskiem na UX/UI oraz płynne animacje.

Stanowi również pierwszy, duży projekt React, służący do nauki oraz zrozumienia wyzwań jakie niesie ze sobą taki projekt. Aplikacja została zaprojektowana z myślą o responsywności i dostępności na różnych urządzeniach, ze szczególnym uwzględnieniem orientacji poziomej ekranu, która najlepiej prezentuje zawartość osi czasu.

---

## Funkcjonalności

### 🕐 Interaktywna oś czasu

- Rozwijane wydarzenia z opisami i ilustracjami
- Wybrane etapy zawierają minigalerie zdjęć z nawigacją strzałkami
- Obsługa zarówno myszą (hover), jak i dotykiem (tap)
- Płynne animacje przejść między stanami
- Responsywne pozycjonowanie względem wysokości viewportu

### 🖼️ Galeria zainteresowań

- Rozwijana horyzontalnie po kliknięciu dedykowanego przycisku
- Obrazy reprezentujące hobby wraz z interaktywnymi opisami
- Opisy widoczne po najechaniu (desktop) lub dotknięciu (mobile)
- Element tekstowy podsumowujący podejście do życia
- Staggered animation przy otwieraniu

### 📱 Responsywność i dostępność

- Dedykowane media queries dostosowane do charakteru layoutu
- Komunikat o obróceniu urządzenia w orientacji pionowej
- Automatyczne dzielenie wyrazów (hyphenation) dla poprawy czytelności
- Pointer Events API dla ujednoliconej obsługi różnych urządzeń
- Niewidzialna strefa zapobiegająca przypadkowemu zamknięciu elementów

### ✨ Animacje i performance

- Płynne przejścia realizowane przez Framer Motion
- Hardware-accelerated transforms (GPU)
- Warunkowe animacje zależne od typu urządzenia
- Auto-fade podpisów na urządzeniach dotykowych (po 3 sekundach)
- Optymalizacja obrazów (WebP, Next.js Image, lazy loading)

---

## Technologie

### Core

- **Next.js 15.2.0** - Framework React z server-side rendering
- **React 19.0.0** - Biblioteka UI
- **TypeScript 5** - Typowanie statyczne

### Stylowanie i animacje

- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.4.7** - Biblioteka animacji

### Dodatkowe biblioteki

- **react-icons 5.5.0** - Zestaw ikon
- **hypher & hyphenation.pl** - Automatyczne dzielenie wyrazów w języku polskim
- **next/image** - optymalizacja obrazów

### Dev Dependencies

- **ESLint** - Linting kodu
- **PostCSS** - Przetwarzanie CSS

---

## Instalacja i uruchomienie

### Wymagania wstępne

- Node.js (wersja 18.18.0 lub wyższa)
- npm lub yarn

### Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/Skulak13/timeline-history.git

# Przejście do katalogu projektu
cd timeline-history

# Instalacja zależności
npm install
```

### Uruchomienie

```bash
# Tryb deweloperski
npm run dev

# Build produkcyjny
npm run build

# Start serwera produkcyjnego
npm start

# Linting
npm run lint
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

---

## Struktura projektu

```
timeline-history/
├── public/
│   └── images/
│       ├── background-image.webp
│       ├── gallery-button.svg
│       ├── rotate-screen.png
│       ├── skulfancy.webp
│       ├── event-images/
│       └── gallery/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   │   └── HyphenatedText.tsx
│   │   ├── Gallery.tsx
│   │   ├── Header.tsx
│   │   ├── Timeline.tsx
│   │   └── TimelineEvent.tsx
│   ├── constants/
│   │   └── viewport.ts
│   └── hooks/
│       ├── useIsMobileLandscape.ts
│       ├── useIsTouchDevice.ts
│       └── useViewportHeight.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

---

## Główne komponenty

### 1. Page (`src/app/page.tsx`)

Główny komponent aplikacji odpowiedzialny za zarządzanie stanem aktywnego elementu oraz renderowanie layoutu.

**Funkcjonalności:**

- Zarządzanie stanem `activeElement` (`timeline` | `gallery`)
- Renderowanie tła z animacją _fade-in_
- Wyświetlanie ostrzeżenia o orientacji ekranu na urządzeniach mobilnych

---

### 2. Header (`src/components/Header.tsx`)

Komponent nagłówka wyświetlający zdjęcie profilowe, tytuł i podtytuł.

**Props:**

```typescript
interface HeaderProps {
  imageUrl: string; // ścieżka do zdjęcia profilowego
  title: string; // główny tytuł
  subtitle: string; // podtytuł
}
```

**Funkcjonalności:**

- Animacja wejścia (fade-in + slide from left)
- Gradient na tekście tytułu
- Responsywny układ

---

### 3. Timeline (`src/components/Timeline.tsx`)

Kontener dla wszystkich wydarzeń na osi czasu.

**Props:**

```typescript
interface TimelineProps {
  activeElement: { source: "timeline" | "gallery"; index: number } | null;
  setActiveElement: (
    element: { source: "timeline" | "gallery"; index: number } | null,
  ) => void;
}
```

**Struktura danych wydarzenia:**

```typescript
interface TimelineEventData {
  text: string; // krótki tytuł
  description: string; // pełny opis
  position: "top" | "bottom"; // pozycja względem osi
  imageUrl?: string; // główne zdjęcie (opcjonalne)
  iconType: "education" | "usa" | "work" | "project";
  timelineGalleryImages?: GalleryImage[]; // galeria (opcjonalna)
}

interface GalleryImage {
  url: string;
  caption?: string;
  captionPosition?: "top" | "bottom";
}
```

**Funkcjonalności:**

- Centrowanie osi czasu na ekranie
- Gradient na linii osi
- Zarządzanie aktywnym elementem

---

### 4. TimelineEvent (`src/components/TimelineEvent.tsx`)

Pojedyncze wydarzenie na osi czasu z możliwością rozwinięcia.

**Props:**

```typescript
interface TimelineEventProps {
  text: string;
  description: string;
  position: "top" | "bottom";
  imageUrl?: string;
  iconType: "education" | "usa" | "work" | "project";
  timelineGalleryImages?: GalleryImage[];
  activeElement: { source: "timeline" | "gallery"; index: number } | null;
  setActiveElement: (
    element: { source: "timeline" | "gallery"; index: number } | null,
  ) => void;
  index: number;
}
```

**Funkcjonalności:**

- Dwa stany: zwinięty (mały) i rozwinięty (duży)
- Obsługa interakcji:
  - Desktop (mysz): hover powoduje rozwinięcie
  - Mobile (dotyk): tap otwiera/zamyka element
- Galeria zdjęć z nawigacją
- Podpisy do zdjęć:
  - Desktop: wyświetlane przy hover
  - Mobile: znikają po 3 sekundach
- Ikony: FaGraduationCap, FaPlane, FaBrain, FaCode
- Responsywne pozycjonowanie względem wysokości viewportu
- Obsługa Pointer Events API (mysz + dotyk)
- Niewidzialna strefa łącząca zapobiegająca przypadkowemu zamknięciu

---

### 5. Gallery (`src/components/Gallery.tsx`)

Rozwijana galeria zainteresowań wyświetlana w lewym dolnym rogu.

**Props:**

```typescript
interface GalleryProps {
  galleryImageUrl: string;
  activeElement: { source: "timeline" | "gallery"; index: number } | null;
  setActiveElement: (
    element: { source: "timeline" | "gallery"; index: number } | null,
  ) => void;
}
```

**Typy elementów:**

```typescript
interface ImageGalleryItem {
  type: "image";
  src: string;
  description: string;
}

interface TextGalleryItem {
  type: "text";
  content: string;
}
```

**Funkcjonalności:**

- Przycisk otwarcia/zamknięcia galerii
- Animowane wejście elementów (staggered animation)
- Efekt hover/touch:
  - Powiększenie obrazu
  - Wyświetlenie opisu
  - Przyciemnienie obrazu
- Obsługa Pointer Events (mysz + dotyk)
- Element tekstowy jako ostatni element galerii

---

### 6. HyphenatedText (`src/components/common/HyphenatedText.tsx`)

Komponent pomocniczy do dzielenia wyrazów w języku polskim.

**Props:**

```typescript
interface HyphenatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}
```

**Funkcjonalności:**

- Automatyczne dzielenie wyrazów według reguł języka polskiego
- Wykorzystuje bibliotekę hypher + hyphenation.pl
- Poprawia czytelność długich tekstów w wąskich kolumnach

---

## 🌟 Czego nauczył mnie projekt Timeline History - wnioski z projektu

**Timeline History** to mój pierwszy, większy samodzielny projekt React. Jako samouk projekt ten był dla mnie nie tylko ćwiczeniem programistycznym, ale przede wszystkim lekcją podejmowania decyzji projektowych, radzenia sobie z ograniczeniami interfejsu oraz świadomego wyboru kompromisów między estetyką, użytecznością i utrzymaniem kodu. Uczyłem się metodą prób i błędów, a to pozwoliło mi zrozumieć, jak decyzje techniczne wpływają na utrzymanie i rozwój aplikacji.

Projekt dokumentuje popełnione przeze mnie błędy, których uświadomienie stanowi dla mnie lekcję i pozwala mi unikać ich w następnych projektach.

### Kluczowe lekcje

#### Lekcja 1: „Zrób, żeby działało" nie zawsze przyspiesza

Początkowe skupienie się wyłącznie na funkcjonalności doprowadziło do narastania długu technicznego. Zduplikowana logika interakcji, style definiowane bezpośrednio w JSX oraz rozrastające się globalne style utrudniały dalszy rozwój projektu. Projekt uświadomił mi, że w aplikacjach interaktywnych decyzje architektoniczne warto podejmować możliwie wcześnie.

#### Lekcja 2: Responsywność a charakter layoutu

Poziomy layout osi czasu z rozwijanymi elementami pokazał mi, że nie każdy interfejs da się sensownie dopasować do każdej rozdzielczości. Nauczyłem się, że responsywność to również świadome ograniczanie wsparcia dla przypadków, gdzie doświadczenie użytkownika (UX) przestaje mieć sens. Projekt osi czasu narzucał ścisłe ograniczenia przestrzenne - klasyczne breakpointy nie zawsze są wystarczające, a próby obsługi wszystkich rozdzielczości mogą prowadzić do nadmiernej złożoności CSS.

#### Lekcja 3: TypeScript wspiera rozwój aplikacji

Typowanie pomogło mi kontrolować strukturę danych i szybciej identyfikować miejsca wymagające aktualizacji. TypeScript stał się dla mnie narzędziem wspierającym rozwój i refaktoryzację kodu, a nie tylko formalnym wymogiem.

### Co zrobiłem dobrze

Mimo popełnionych błędów, projekt zawiera rozwiązania, które świadomie zaprojektowałem i z których jestem zadowolony:

- **Ujednolicona obsługa interakcji** - Pointer Events API dla myszy i dotyku eliminuje duplikację kodu dla różnych typów urządzeń
- **Custom hooks** - wydzielanie logiki (`useViewportHeight`, `useIsTouchDevice`, `useIsMobileLandscape`) ułatwia testowanie i ponowne użycie
- **Dostępność od początku** - uwzględnianie użytkowników dotykowych nie jako afterthought, ale jako integralną część projektu
- **Optymalizacja zasobów** - świadome użycie WebP, Next.js Image oraz animacji przyjaznych GPU

### Perspektywa po zakończeniu projektu

Projekt ten uświadomił mi, że nawet w małych aplikacjach struktura i organizacja kodu mają znaczenie od samego początku. Dziś wiele decyzji podjąłbym szybciej i bardziej świadomie - szczególnie w kontekście wczesnego definiowania granic użyteczności interfejsu oraz akceptowania kompromisów wynikających z charakteru layoutu.

Jednocześnie wiem, że bez tego projektu nie byłbym w stanie zrozumieć ograniczeń, z którymi realnie mierzy się interaktywny interfejs. Każdy senior developer zaczynał od takiego właśnie kodu. Różnica polega na tym, czy potrafi spojrzeć wstecz i nazwać swoje błędy.

---

## Responsive Design

Aplikacja została zaprojektowana z naciskiem na pełną responsywność i adaptację do różnych urządzeń.

### Breakpointy (Tailwind CSS)

Customowe breakpointy zdefiniowane w `globals.css`:

```css
--breakpoint-xs: 50rem; /* 800px */
--breakpoint-sm: 56.25rem; /* 900px */
--breakpoint-2sm: 58.8rem; /* 940px */
--breakpoint-3sm: 65.5rem; /* 1048px */
--breakpoint-4sm: 76rem; /* 1216px */
--breakpoint-lg: 81rem; /* 1296px */
--breakpoint-xl: 94rem; /* 1504px */
--breakpoint-2xl: 97.6rem; /* 1561.6px */
--breakpoint-3xl: 103rem; /* 1648px */
```

### Adaptacje wysokości ekranu

- `< 770px`: zmniejszenie odstępów i czcionek
- `< 650px`: dalsze zmniejszenie elementów
- `< 570px`: minimalne rozmiary dla bardzo małych ekranów
- `< 550px (landscape mobile)`: specjalne optymalizacje dla poziomych telefonów

### CSS Variables dla galerii

```css
:root {
  --gallery-base-size: 9rem; /* Podstawowy rozmiar */
  --gallery-hover-size: 18rem; /* Rozmiar po rozwinięciu */
  --small-img-size: 64px; /* Miniaturki */
}
```

### Orientacja ekranu

Na urządzeniach mobilnych i tabletach w orientacji pionowej aplikacja wyświetla komunikat zachęcający do obrócenia ekranu. Warunek celowo zawiera `pointer: coarse`, aby obejmować wyłącznie urządzenia dotykowe.

```css
@media only screen and (orientation: portrait) and (max-width: 1024px) and (pointer: coarse) {
  .landscape-content {
    display: none;
  }
  .portrait-warning {
    display: flex;
  }
}
```

Próg `max-width` ustawiono na 1024px, aby objąć tablety takie jak iPad Air (820px), Surface Pro 7 (912px), Asus Zenbook Fold (853px) oraz iPad Pro (1024px).

### Mały viewport w orientacji poziomej

Gdy viewport jest zbyt mały dla desktopowego layoutu osi czasu — gdzie rozwinięte bloki unoszą się powyżej i poniżej osi — aplikacja przełącza się na układ wyśrodkowany, w którym bloki pozostają na osi.

```css
@media only screen and (orientation: landscape) and (max-width: 1130px) and (max-height: 780px) {
  /* style dla małego viewportu w orientacji poziomej */
}
```

Progi `1130 x 780px` zostały dobrane tak, aby obejmować tablety takie jak iPad Mini w orientacji poziomej (1024 x 768px) oraz Surface Duo w orientacji poziomej (~1114 x 720px).

---

## Customowe hooki

Aplikacja wykorzystuje trzy customowe hooki wspierające **responsywność** i **interakcje** w komponentach. Każdy hook jest napisany w TypeScript i znajduje się w katalogu `src/hooks/`.

### 1. useViewportHeight (`src/hooks/useViewportHeight.ts`)

Zwraca aktualną wysokość okna przeglądarki i automatycznie aktualizuje wartość przy zmianie rozmiaru.

**Przykład użycia:**

```typescript
const height: number = useViewportHeight();
```

**Zastosowanie:**

- Dynamiczne pozycjonowanie elementów `TimelineEvent`
- Dostosowanie offsetów i layoutu w zależności od wysokości viewportu

---

### 2. useIsTouchDevice (`src/hooks/useIsTouchDevice.ts`)

Wykrywa, czy użytkownik korzysta z urządzenia dotykowego. Implementacja oparta o media query `pointer: coarse`.

**Przykład użycia:**

```typescript
const isTouchDevice: boolean = useIsTouchDevice();
```

**Zastosowanie:**

- Warunkowe wyświetlanie podpisów (np. auto-fade na mobile) zamiast hover
- Różnicowanie logiki interakcji między myszą a ekranem dotykowym

---

### 3. useIsMobileLandscape (`src/hooks/useIsMobileLandscape.ts`)

Wykrywa, czy aktualny viewport jest zbyt mały dla desktopowego layoutu osi czasu w orientacji poziomej.

**Kryteria wykrywania:**

- Szerokość ekranu ≤ 1130px
- Wysokość ekranu ≤ 780px
- Orientacja landscape (szerokość > wysokość)

Wartości progowe są zdefiniowane w `src/constants/viewport.ts` i zsynchronizowane z odpowiadającym media query w `globals.css`, eliminując duplikację i ryzyko niespójności.

**Przykład użycia:**

```typescript
const isMobileLandscape: boolean = useIsMobileLandscape();
```

**Zastosowanie:**

- Pozycjonowanie elementów `TimelineEvent` gdy viewport jest zbyt mały dla desktopowego layoutu — bloki pozostają wyśrodkowane na osi zamiast unosić się powyżej/poniżej niej
- Dostosowanie layoutu dla lepszej czytelności i użyteczności
- Alternatywne offsety dla ograniczonej przestrzeni pionowej

---

## Konfiguracja

### Tailwind CSS (`globals.css`)

- Custom theme z dodatkowymi breakpointami i zmiennymi CSS
- Utility-first podejście do stylowania

### Next.js (`next.config.ts`)

- Podstawowa konfiguracja frameworka
- Optymalizacja obrazów przez `next/image`

### TypeScript (`tsconfig.json`)

- Target: ES2017
- Strict mode włączony
- Path aliases: `@/*` → `./src/*`

### PostCSS (`postcss.config.mjs`)

```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};
```

---

## Optymalizacje

### Obrazy

- Format **WebP** dla lepszej kompresji
- Komponent **Next.js Image** z lazy loading
- Responsive images dla różnych rozdzielczości

### Animacje

- **Framer Motion** z `layoutId` dla płynnych przejść
- Hardware-accelerated transforms (GPU)
- Warunkowe animacje zależne od urządzenia

### Performance

- **React 19** z automatycznym batchingiem
- Memoizacja komponentów tam, gdzie potrzebna
- Efektywne zarządzanie stanem globalnym (`activeElement`)

---

## Interakcje i dostępność

### Pointer Events API

- Ujednolicona obsługa myszy i dotyku (`onPointerEnter`, `onPointerLeave`, `onPointerUp`)
- Upraszcza kod i zapewnia spójne zachowanie

### Focus trap

- Niewidzialna strefa między kółkiem a blokiem wydarzenia anuluje timer zamknięcia
- Zapobiega przypadkowemu domknięciu elementu podczas przejścia kursorem

### Auto-fade podpisów

- **Desktop:** podpisy pojawiają się przy hover
- **Mobile:** podpisy wyświetlane po tapnięciu i automatycznie znikają po 3 sekundach

### ARIA attributes

- Stosowane w komponentach modalnych i interaktywnych
- Poprawiają dostępność dla czytników ekranu

---

## Stylowanie

### Paleta kolorów i gradientów

- Gradient od `#FF5F6D` do `#FFC371` dla elementów akcentujących
- Kolor `#4CE0D2` z półprzezroczystością dla bloków treści
- Efekty `backdrop-blur` dla elementów z przezroczystym tłem

### Utility classes

- Tailwind CSS jako główny system stylowania
- Dodatkowe klasy globalne dla responsywności (`.responsive-padding`, `.text-big-font`, `.description-font`)

---

## Skrypty npm

```bash
npm run dev     # uruchamia serwer deweloperski z hot-reload
npm run build   # tworzy zoptymalizowaną wersję produkcyjną
npm start       # uruchamia serwer produkcyjny (po buildzie)
npm run lint    # sprawdza kod przy użyciu ESLint
```

---

## Licencja

Ten projekt jest licencjonowany na **licencji MIT** - zobacz plik [LICENSE](LICENSE) dla szczegółów.

---

## Podziękowania

- [Flaticon - Rotation icons](https://www.flaticon.com/free-icons/rotation) by Pixel perfect
