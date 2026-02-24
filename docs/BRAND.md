# ISM Brand Guidelines

## Brand Identity

**International Students Movement (ISM)** is a student-focused digital platform serving international students in Australia. The brand communicates empowerment, community, and access to curated opportunities (jobs, housing, discounts).

### Brand Personality
- **Empowering** — Students helping students succeed
- **Modern & Premium** — Award-winning web design standards, not a basic portal
- **Trustworthy** — Clean, clear, no visual clutter or gimmicks
- **Dynamic** — Movement is in the name; the brand should feel alive and kinetic
- **Inclusive** — Welcoming to all international students regardless of background

### Brand Voice
- Confident but approachable
- Direct and action-oriented ("Join the movement", "Explore the Hub")
- Student-first language, never corporate jargon
- Uppercase for impact headings, sentence case for body text

---

## Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Emerald 600 | `#059669` | Primary accent, logo gradient start, CTAs |
| Emerald 500 | `#10B981` | Text accents, active states, highlights |
| Emerald 400 | `#34D399` | Gradient accents, hover states |
| Teal 500 | `#0D9488` | Logo gradient end, secondary accent |
| Cyan 500 | `#06B6D4` | Tertiary accent, text gradient terminal |

### Dark Theme (Primary)
| Name | Hex | Usage |
|------|-----|-------|
| Background | `#0A1210` | Page background, hero base |
| Elevated | `#101E1A` | Cards, elevated surfaces |
| Secondary | `#142420` | Muted surfaces, borders |
| Foreground | `#F5F0EB` | Primary text on dark |
| Muted text | `#8A9A94` | Secondary text on dark |

### Light Theme
| Name | Hex | Usage |
|------|-----|-------|
| Background | `#FAFAF7` | Page background |
| Elevated | `#FFFFFF` | Cards, surfaces |
| Foreground | `#1A1A2E` | Primary text |
| Muted text | `#6B7084` | Secondary text |

### Gradient Definitions
- **Logo gradient**: `linear-gradient(135deg, #059669, #0D9488)` — emerald to teal
- **Hero background**: Animated multi-stop gradient using dark emerald tones
- **Text shimmer**: `linear-gradient(135deg, #FFFFFF, #34D399, #10B981, #06B6D4, #FFFFFF)` — white-emerald-teal

---

## Typography

### Font Stack
- **Primary**: System font stack (Inter or similar sans-serif)
- **Weight range**: 300 (light) to 800 (extrabold)
- **Display weight**: 800 for hero headings

### Type Scale (Fluid)
| Class | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `.text-display` | `clamp(3.5rem, 2rem + 6vw, 10rem)` | 0.9 | 800 | Hero heading |
| `.text-h1` | `clamp(2.5rem, 1.5rem + 4vw, 6rem)` | 1.0 | 700 | Page headings |
| `.text-h2` | `clamp(1.75rem, 1rem + 3vw, 4rem)` | 1.1 | 700 | Section headings |
| `.text-body-lg` | `1.125rem` | 1.6 | 400 | Body large |

### Typography Treatments
- **Uppercase tracking**: `letter-spacing: 0.2em–0.3em` for eyebrow text and labels
- **Tight tracking**: `letter-spacing: -0.02em` for display and heading text
- **Gradient text**: Applied to hero keyword ("MOVEMENT") using `background-clip: text`

---

## Logo

### Mark
The ISM logo is a geometric monogram inside a rounded emerald gradient square:
- **I**: Bold vertical bar
- **S**: Geometric block-style S (three horizontal bars with alternating connectors)
- **M**: Rectangle with triangular V-notch

### Usage
- Minimum size: 16x16px (favicon)
- Always use on the gradient background — never place raw white letters on arbitrary backgrounds
- Maintain clear space of at least 25% of the logo width on all sides

### Files
- `/public/logo.svg` — Full gradient version
- `/src/app/icon.svg` — Flat color version (favicon)
- `/src/components/ui/logo.tsx` — React component with unique gradient IDs

---

## Motion & Animation Principles

### Philosophy
Motion is core to the ISM identity. The brand name contains "Movement" — animations should reinforce that. Every transition should feel intentional, fluid, and premium.

### Easing
- **Primary ease**: `[0.22, 1, 0.36, 1]` — smooth, slightly overshooting deceleration
- **Gentle ease**: `easeInOut` for looping/ambient animations
- **Linear**: Only for continuous ambient effects (gradient shifts, floating orbs)

### Animation Patterns
| Pattern | Duration | Usage |
|---------|----------|-------|
| Staggered text reveal | 0.06–0.08s stagger, 0.5–0.8s per element | Headlines, word-by-word |
| Character-level kinetics | 0.03–0.04s stagger, 0.4s per char | Key words, interactive text |
| Fade + slide up | 0.5–0.6s duration | Subtitles, CTAs, cards |
| Parallax scroll | Continuous, scroll-linked | Background layers, hero content |
| Ambient float | 20–28s cycle, infinite | Background orbs, decorative elements |
| Hover scale | 0.3s ease | Buttons, cards, interactive elements |
| Scroll-triggered reveal | 0.6s duration, threshold 0.2 | Section entries below fold |

### Performance Rules
- Prefer `transform` and `opacity` animations (GPU-accelerated)
- Use `will-change` sparingly and only on animated elements
- Limit simultaneous complex animations to 3–4 elements
- Avoid layout-triggering animations (width, height, margin)
- Lazy-load heavy animation components below the fold

---

## Visual Effects

### Texture & Grain
- Subtle SVG noise overlay at `opacity: 0.03` on dark sections
- Adds organic, film-like quality without impacting performance

### Background Treatments
- **Gradient mesh**: Animated multi-stop gradients with slow position shift
- **Floating orbs**: Large blurred circles (`blur-[100px]`) with gentle drift animations
- **Grid overlay**: Fine white grid at very low opacity for structure
- **Radial glows**: Accent-colored radial gradients behind key content

### Depth & Layering
- Use `z-index` deliberately: background (0) < overlays (1) < content (10) < UI (50)
- Glassmorphism for elevated surfaces: `backdrop-blur` + semi-transparent backgrounds
- Subtle shadows with brand color tint: `shadow-emerald-500/25`

---

## Design Inspiration Sources

### Primary Inspirations

**1. Lokal Apps** — https://www.lokalapps.com/
- SVG stroke animations and Lottie transitions
- GSAP ScrollTrigger for forward/reverse scroll animations
- Platform icons scaling with staggered opacity
- Cross-fade between animation states on scroll
- Vibrant accent colors over dark base

**2. Ora Studio** — https://www.awwwards.com/sites/ora-studio
- Fluid typography with CSS `clamp()`
- Dynamic header states (transparent → solid on scroll)
- Staggered animations with `animation-delay` for sequential reveals
- High contrast: deep blacks with vibrant orange/blue accents
- Sophisticated overlay system with controlled transparency

**3. Aquamare Marine** — https://www.awwwards.com/sites/aquamare-marine
- 12-column grid system with custom gap variables
- Micro-interactions on all interactive elements (0.3–0.6s)
- Image brightness filters on hover for depth
- Glassmorphism touches with rgba backgrounds
- Progressive disclosure via sticky + sliding headers

**4. Becky Entertainment** — https://www.awwwards.com/sites/becky-entertainment
- Filter dropdowns with smooth opacity/visibility transitions
- Masonry-like CSS Grid layouts (auto-fill + minmax)
- Pulse effect animations on featured elements
- `cubic-bezier(0, 1, 0.5, 1)` for expanding toggles
- Loading spinners with rotation animations

**5. Basel Supercluster** — https://www.awwwards.com/sites/basel-supercluster
- Swiss design principles: minimalist, grid-based
- Gradient overlays on hover for depth
- Staggered transitions with consistent 0.3s timing
- Organic content arrangement via `grid-auto-flow: row dense`
- Layered spacing using `clamp()` functions

### Key Takeaways for ISM
1. **Scroll-driven storytelling** — Content reveals as the user scrolls, creating narrative
2. **Micro-interactions everywhere** — Every hover, click, and scroll should have feedback
3. **Typography as design** — Large, bold type IS the visual; background supports it
4. **Restrained color** — Dark base + 1-2 accent colors, not a rainbow
5. **Performance-first motion** — Smooth 60fps, no jank, transform/opacity only
6. **Progressive disclosure** — Don't show everything at once; reward scrolling

---

## Component Patterns

### Buttons
- **Primary CTA**: Emerald background, white text, shadow with brand color tint
- **Secondary/Ghost**: Transparent with white border, white text, subtle hover fill
- **Hover**: Scale slightly (1.02–1.05), increase shadow, darken/lighten background

### Cards
- Rounded corners (`8px` standard, `16px` for featured)
- Subtle border or shadow for elevation
- Hover: slight lift (translateY -2px) + shadow increase
- Content padding: generous, minimum 24px

### Navigation
- Transparent on hero, solid on scroll
- Logo mark + wordmark on the left
- Clean uppercase links with wide tracking
- CTA button stands out with brand color

---

## Responsive Breakpoints
| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | `< 640px` | Phones |
| Tablet | `640px–1024px` | Tablets, small laptops |
| Desktop | `1024px–1440px` | Standard desktop |
| Wide | `> 1440px` | Large displays |

Mobile-first approach: design for mobile, enhance for desktop.

---

## File Naming Conventions
- Components: `kebab-case.tsx` (e.g., `split-text.tsx`)
- Pages: Next.js App Router conventions (`page.tsx`, `layout.tsx`)
- Styles: `globals.css` for utilities, Tailwind for component styles
- Assets: Descriptive lowercase (e.g., `logo.svg`, `icon.svg`)

---

*Last updated: February 2026*
