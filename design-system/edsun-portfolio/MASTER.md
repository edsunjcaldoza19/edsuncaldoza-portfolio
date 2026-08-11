# Edsun Portfolio — Design System

**Direction:** Clean, content-first personal portfolio  
**Audience:** Recruiters, hiring managers, and creative clients  
**Design dials:** Variance 3/10 · Motion 2/10 · Density 3/10

## Principles

1. The work leads; decoration stays quiet.
2. One blue accent supports hierarchy and action.
3. Sections use generous whitespace, consistent widths, and restrained type scales.
4. Motion is limited to 150–250ms interaction feedback and respects reduced-motion settings.
5. Every interactive control is keyboard accessible, visibly focused, and at least 44px tall.

## Tokens

| Role | Value |
|---|---|
| Background | `#FAFAFA` |
| Surface | `#FFFFFF` |
| Subtle surface | `#F4F4F5` |
| Primary text | `#18181B` |
| Muted text | `#52525B` |
| Accent / CTA | `#2563EB` |
| Accent soft | `#EFF6FF` |
| Border | `#E4E4E7` |
| Focus ring | `#2563EB` |

Typography uses the native system sans-serif stack for fast rendering and a neutral professional tone. Headings use 650–720 weight with restrained negative tracking; body copy uses 400–500 weight and at least 1.6 line-height.

Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 96px`. Content width is capped at `1180px`; reading copy is capped near `680px`.

## Components

- Buttons: 48px minimum height, 10px radius, blue primary and white secondary styles.
- Cards: white surfaces, 1px neutral border, 18px radius, no heavy shadows.
- Project media: consistent 4:3 frames, 18px radius, subtle image zoom only on pointer hover.
- Navigation: sticky 72px bar, five destinations maximum, visible active state, mobile disclosure menu.
- Focus: 3px blue outline with 3px offset on every interactive element.

## Page Pattern

1. Clear role and value proposition
2. Career proof
3. Curated work
4. Video reel
5. Services and capabilities
6. About and testimonial proof
7. Direct contact CTA

## Avoid

- Oversized display type that dominates the work
- Tilted labels, spinning text, ornamental grids, and acid color blocks
- Multiple competing accent colors
- Hover-only meaning, layout-shifting hover effects, and hidden focus rings
- Dense borders, excessive section numbering, and long resume content on the homepage

## Delivery Checks

- Contrast meets WCAG AA.
- Keyboard order follows the visual order and a skip link is present.
- Touch targets are at least 44×44px.
- Images reserve space and below-fold media is lazy-loaded.
- Layouts hold at 375px, 768px, 1024px, and 1440px without horizontal scrolling.
- `prefers-reduced-motion` is respected.
