# Edsun Portfolio — Design System

**Direction:** Dark editorial, work-led personal portfolio

**Audience:** Recruiters, hiring managers, and creative clients

**Design dials:** Variance 7/10 · Motion 3/10 · Density 3/10

## Principles

1. Oversized editorial type establishes a distinctive point of view without competing with project media.
2. Cobalt is the only accent; all other surfaces remain charcoal or neutral.
3. Numbered sections, thin borders, and generous whitespace create rhythm across every route.
4. Motion is limited to a 12px fade-and-rise reveal plus direct interaction feedback, with a full reduced-motion fallback.
5. Every interactive control is keyboard accessible, visibly focused, and at least 44px tall.

## Theme Tokens

| Role | Dark default | Light alternative |
|---|---|---|
| Background | `#0B0D10` | `#F7F7F4` |
| Surface | `#11151A` | `#FFFFFF` |
| Primary text | `#F5F7FA` | `#111317` |
| Muted text | `#A4ABB5` | `#565E68` |
| Accent / CTA | `#2563EB` | `#1D4ED8` |
| Border | `rgba(255,255,255,.12)` | `rgba(17,19,23,.14)` |

Space Grotesk is the display face and is loaded with `next/font/google`; body copy uses the native sans-serif stack. Headings use 580–650 weight, tight editorial tracking, and fluid `clamp()` sizing. Body copy remains at least 16px on mobile with 1.6–1.8 line-height.

Spacing follows an 8px rhythm. Primary content is capped at `1240px`; long-form copy stays near `720px`.

## Components

- Navigation: full-width sticky bar at the top that morphs into a compact 960px rectangular bar after 32px, while preserving name/monogram, Work, About, Contact, theme toggle, résumé, and mobile disclosure menu. A 2px cobalt bar along its bottom edge reports document scroll progress; in the rounded state, inset the track by the corner radius so it never crosses the shell edge. Use an 8px nested radius for the résumé control and 7px for the mobile disclosure control; active routes use text emphasis rather than a competing underline.
- Theme control: dark by default, persisted in `edsun-theme`, initialized before paint, and exposed as a labeled button.
- Buttons: 48px minimum height, square editorial edges, cobalt primary and bordered secondary styles.
- Cards: two-column project grid, 4:3 media, project index, category, outcome, and internal case-study link.
- Sections: visible two-digit numbering, thin dividers, and large display headings.
- Focus: 3px cobalt-family outline with 4px offset on every interactive element.

## Page Pattern

1. Impact-led hero with a supporting rotating role and grayscale portrait
2. Compact proof strip
3. About and core expertise
4. Six selected projects
5. Full-width client testimonial
6. Oversized contact close

## Avoid

- Decorative color beyond cobalt
- Heavy shadows, glass effects, pill-heavy UI, and excessive rounding
- Parallax, cursor tracking, animation libraries, or motion without meaning
- Hover-only meaning, layout-shifting effects, and hidden focus rings
- Long résumé content on the homepage

## Delivery Checks

- Contrast meets WCAG AA in both themes.
- Keyboard order follows the visual order and a skip link is present.
- Touch targets are at least 44×44px.
- Images reserve space and below-fold media is lazy-loaded.
- Layouts hold at 375px, 768px, 1024px, and 1440px without horizontal scrolling.
- `prefers-reduced-motion` removes transforms and reveals content immediately.
