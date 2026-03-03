# Timeline History - The Way to Code!

**🚀 [View Live Demo](https://timeline-history-lilac.vercel.app/)**

<br>

**Author:** Tomek Skulski ([@Skulak13](https://github.com/Skulak13))  
**Connect:** [LinkedIn](https://linkedin.com/in/tomasz-skulski) | [GitHub](https://github.com/Skulak13) | [Codewars](https://www.codewars.com/users/Skulak13)

<br>

> 🇵🇱 **[Polish version / Wersja polska](README.pl.md)**

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation & Setup](#installation--setup)
5. [Project Structure](#project-structure)
6. [Core Components](#core-components)
7. [🌟 What This Project Taught Me](#-what-this-project-taught-me---lessons-learned)
8. [Responsive Design](#responsive-design)
9. [Custom Hooks](#custom-hooks)
10. [Configuration](#configuration)
11. [Optimizations](#optimizations)
12. [Interactions & Accessibility](#interactions--accessibility)
13. [Styling](#styling)
14. [NPM Scripts](#npm-scripts)

---

## Project Overview

**Timeline History** is an interactive web application presenting my personal journey into programming. Created as a portfolio piece showcasing life experiences in a visually engaging way, with emphasis on UX/UI and smooth animations.

This is also my first major React project, serving as a learning experience to understand the challenges that come with building such applications. The app is designed with responsiveness and accessibility in mind, with particular focus on landscape orientation, which best presents the timeline content.

---

## Features

### 🕐 Interactive Timeline

- Expandable events with descriptions and illustrations
- Selected milestones include mini-galleries with arrow navigation
- Supports both mouse (hover) and touch (tap) interactions
- Smooth transition animations between states
- Responsive positioning based on viewport height

### 🖼️ Interests Gallery

- Expands horizontally when clicking a dedicated button
- Images representing hobbies with interactive descriptions
- Descriptions visible on hover (desktop) or tap (mobile)
- Text element summarizing life approach
- Staggered animation on opening

### 📱 Responsiveness & Accessibility

- Dedicated media queries adapted to layout characteristics
- Screen rotation prompt in portrait orientation
- Automatic word hyphenation for improved readability
- Pointer Events API for unified device handling
- Invisible bridge zone preventing accidental closures

### ✨ Animations & Performance

- Smooth transitions powered by Framer Motion
- Hardware-accelerated transforms (GPU)
- Conditional animations based on device type
- Auto-fade captions on touch devices (after 3 seconds)
- Image optimization (WebP, Next.js Image, lazy loading)

---

## Tech Stack

### Core

- **Next.js 15.2.0** - React framework with server-side rendering
- **React 19.0.0** - UI library
- **TypeScript 5** - Static typing

### Styling & Animations

- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.4.7** - Animation library

### Additional Libraries

- **react-icons 5.5.0** - Icon set
- **hypher & hyphenation.pl** - Automatic word hyphenation in Polish
- **next/image** - Image optimization

### Dev Dependencies

- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## Installation & Setup

### Prerequisites

- Node.js (version 18.18.0 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Skulak13/timeline-history.git

# Navigate to project directory
cd timeline-history

# Install dependencies
npm install
```

### Running

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

Application will be available at: `http://localhost:3000`

---

## Project Structure

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

## Core Components

### 1. Page (`src/app/page.tsx`)

Main application component managing active element state and layout rendering.

**Responsibilities:**

- Managing `activeElement` state (`timeline` | `gallery`)
- Rendering background with _fade-in_ animation
- Displaying screen orientation warning on mobile devices

---

### 2. Header (`src/components/Header.tsx`)

Header component displaying profile photo, title and subtitle.

**Props:**

```typescript
interface HeaderProps {
  imageUrl: string; // path to profile photo
  title: string; // main title
  subtitle: string; // subtitle
}
```

**Features:**

- Entry animation (fade-in + slide from left)
- Gradient on title text
- Responsive layout

---

### 3. Timeline (`src/components/Timeline.tsx`)

Container for all timeline events.

**Props:**

```typescript
interface TimelineProps {
  activeElement: { source: "timeline" | "gallery"; index: number } | null;
  setActiveElement: (
    element: { source: "timeline" | "gallery"; index: number } | null,
  ) => void;
}
```

**Event data structure:**

```typescript
interface TimelineEventData {
  text: string; // short title
  description: string; // full description
  position: "top" | "bottom"; // position relative to axis
  imageUrl?: string; // main image (optional)
  iconType: "education" | "usa" | "work" | "project";
  timelineGalleryImages?: GalleryImage[]; // gallery (optional)
}

interface GalleryImage {
  url: string;
  caption?: string;
  captionPosition?: "top" | "bottom";
}
```

**Features:**

- Timeline centering on screen
- Gradient on axis line
- Active element management

---

### 4. TimelineEvent (`src/components/TimelineEvent.tsx`)

Individual timeline event with expand capability.

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

**Features:**

- Two states: collapsed (small) and expanded (large)
- Interaction handling:
  - Desktop (mouse): hover triggers expansion
  - Mobile (touch): tap opens/closes element
- Photo gallery with navigation
- Photo captions:
  - Desktop: displayed on hover
  - Mobile: disappear after 3 seconds
- Icons: FaGraduationCap, FaPlane, FaBrain, FaCode
- Responsive positioning based on viewport height
- Pointer Events API support (mouse + touch)
- Invisible bridge zone preventing accidental closure

---

### 5. Gallery (`src/components/Gallery.tsx`)

Expandable interests gallery displayed in bottom left corner.

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

**Element types:**

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

**Features:**

- Gallery open/close button
- Animated element entry (staggered animation)
- Hover/touch effects:
  - Image enlargement
  - Description display
  - Image dimming
- Pointer Events support (mouse + touch)
- Text element as last gallery item

---

### 6. HyphenatedText (`src/components/common/HyphenatedText.tsx`)

Helper component for word hyphenation in Polish.

**Props:**

```typescript
interface HyphenatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}
```

**Features:**

- Automatic word hyphenation following Polish language rules
- Uses hypher + hyphenation.pl library
- Improves readability of long texts in narrow columns

---

## 🌟 What This Project Taught Me - Lessons Learned

**Timeline History** is my first major self-built React project. As a self-taught developer, this project was not just a programming exercise, but primarily a lesson in making design decisions, dealing with interface constraints, and consciously choosing compromises between aesthetics, usability, and code maintainability. I learned through trial and error, which allowed me to understand how technical decisions impact application maintenance and development.

The project documents mistakes I made, whose awareness serves as a lesson and helps me avoid them in future projects.

### Key Lessons

#### Lesson 1: "Make It Work First" Doesn't Always Speed Things Up

Initially focusing solely on functionality led to accumulating technical debt. Duplicated interaction logic, styles defined directly in JSX, and growing global styles made further development difficult. The project taught me that in interactive applications, architectural decisions are worth making as early as possible.

#### Lesson 2: Responsiveness vs. Layout Character

The horizontal timeline layout with expandable elements showed me that not every interface can be sensibly adapted to every resolution. I learned that responsiveness also means consciously limiting support for cases where user experience (UX) stops making sense. The timeline project imposed strict spatial constraints - classic breakpoints aren't always sufficient, and attempting to support all resolutions can lead to excessive CSS complexity.

#### Lesson 3: TypeScript Supports Application Development

Typing helped me control data structure and quickly identify places requiring updates. TypeScript became a tool supporting development and code refactoring, not just a formal requirement.

### What I Did Right

Despite mistakes made, the project contains solutions I consciously designed and am satisfied with:

- **Unified interaction handling** - Pointer Events API for mouse and touch eliminates code duplication for different device types
- **Custom hooks** - extracting logic (`useViewportHeight`, `useIsTouchDevice`, `useIsMobileLandscape`) facilitates testing and reuse
- **Accessibility from the start** - considering touch users not as an afterthought, but as an integral part of the project
- **Resource optimization** - conscious use of WebP, Next.js Image, and GPU-friendly animations

### Perspective After Project Completion

This project made me realize that even in small applications, code structure and organization matter from the very beginning. Today I would make many decisions faster and more consciously - especially regarding early definition of interface usability boundaries and accepting compromises resulting from layout character.

At the same time, I know that without this project I wouldn't be able to understand the constraints that interactive interfaces realistically face. Every senior developer started with exactly this kind of code. The difference lies in whether they can look back and name their mistakes.

---

## Responsive Design

The application was designed with emphasis on full responsiveness and adaptation to different devices.

### Breakpoints (Tailwind CSS)

Custom breakpoints defined in `globals.css`:

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

### Screen Height Adaptations

- `< 770px`: reduced spacing and fonts
- `< 650px`: further element reduction
- `< 570px`: minimum sizes for very small screens
- `< 550px (landscape mobile)`: special optimizations for horizontal phones

### CSS Variables for Gallery

```css
:root {
  --gallery-base-size: 9rem; /* Base size */
  --gallery-hover-size: 18rem; /* Size after expansion */
  --small-img-size: 64px; /* Thumbnails */
}
```

### Screen Orientation

On mobile devices and tablets in portrait orientation, the application displays a screen rotation prompt. The condition intentionally includes pointer: coarse to target only touch devices.

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

The max-width threshold is set to 1024px to include tablets such as iPad Air (820px), Surface Pro 7 (912px), Asus Zenbook Fold (853px), and iPad Pro (1024px).

### Small Viewport Landscape Layout

When the viewport is too small for the desktop-style timeline layout - where expanded blocks float above and below the axis - the application switches to a centered layout where blocks stay on the axis.

```css
@media only screen and (orientation: landscape) and (max-width: 1130px) and (max-height: 780px) {
  /* small viewport landscape styles */
}
```

The thresholds `1130 x 780px` were extended to cover tablets such as iPad Mini in landscape (1024 x 768px) and Surface Duo in landscape (~1114 x 720px).

---

## Custom Hooks

The application uses three custom hooks supporting **responsiveness** and **interactions** in components. Each hook is written in TypeScript and located in the `src/hooks/` directory.

### 1. useViewportHeight (`src/hooks/useViewportHeight.ts`)

Returns current browser window height and automatically updates value on resize.

**Usage example:**

```typescript
const height: number = useViewportHeight();
```

**Use cases:**

- Dynamic positioning of `TimelineEvent` elements
- Adjusting offsets and layout based on viewport height

---

### 2. useIsTouchDevice (`src/hooks/useIsTouchDevice.ts`)

Detects whether the user is using a touch device. Implementation based on media query `pointer: coarse`.

**Usage example:**

```typescript
const isTouchDevice: boolean = useIsTouchDevice();
```

**Use cases:**

- Conditional caption display (e.g., auto-fade on mobile) instead of hover
- Differentiating interaction logic between mouse and touch screen

---

### 3. useIsMobileLandscape (`src/hooks/useIsMobileLandscape.ts`)

Detects whether the current viewport is too small for the desktop-style timeline layout in landscape orientation.

**Detection criteria:**

- Screen width ≤ 1130px
- Screen height ≤ 780px
- Landscape orientation (width > height)

Threshold values are defined in `src/constants/viewport.ts` and synchronized with the corresponding media query in `globals.css`, eliminating duplication and risk of inconsistency.

**Usage example:**

```typescript
const isMobileLandscape: boolean = useIsMobileLandscape();
```

**Use cases:**

- Positioning of `TimelineEvent` elements when the viewport is too small for the desktop layout - blocks remain centered on the axis instead of floating above/below it
- Layout adaptation for better readability and usability
- Alternative offsets for limited vertical space

---

## Configuration

### Tailwind CSS (`globals.css`)

- Custom theme with additional breakpoints and CSS variables
- Utility-first styling approach

### Next.js (`next.config.ts`)

- Basic framework configuration
- Image optimization through `next/image`

### TypeScript (`tsconfig.json`)

- Target: ES2017
- Strict mode enabled
- Path aliases: `@/*` → `./src/*`

### PostCSS (`postcss.config.mjs`)

```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};
```

---

## Optimizations

### Images

- **WebP** format for better compression
- **Next.js Image** component with lazy loading
- Responsive images for different resolutions

### Animations

- **Framer Motion** with `layoutId` for smooth transitions
- Hardware-accelerated transforms (GPU)
- Conditional animations based on device type

### Performance

- **React 19** with automatic batching
- Component memoization where needed
- Efficient global state management (`activeElement`)

---

## Interactions & Accessibility

### Pointer Events API

- Unified mouse and touch handling (`onPointerEnter`, `onPointerLeave`, `onPointerUp`)
- Simplifies code and ensures consistent behavior

### Focus trap

- Invisible zone between circle and event block cancels closure timer
- Prevents accidental element closure during cursor transition

### Auto-fade captions

- **Desktop:** captions appear on hover
- **Mobile:** captions displayed after tap and automatically disappear after 3 seconds

### ARIA attributes

- Applied in modal and interactive components
- Improve accessibility for screen readers

---

## Styling

### Color Palette & Gradients

- Gradient from `#FF5F6D` to `#FFC371` for accent elements
- Color `#4CE0D2` with semi-transparency for content blocks
- `backdrop-blur` effects for elements with transparent background

### Utility classes

- Tailwind CSS as main styling system
- Additional global classes for responsiveness (`.responsive-padding`, `.text-big-font`, `.description-font`)

---

## NPM Scripts

```bash
npm run dev     # runs development server with hot-reload
npm run build   # creates optimized production build
npm start       # runs production server (after build)
npm run lint    # checks code using ESLint
```

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Flaticon - Rotation icons](https://www.flaticon.com/free-icons/rotation) by Pixel perfect
