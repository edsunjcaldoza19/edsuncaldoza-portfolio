# Edsun Portfolio — Design System

**Direction:** Dark editorial, work-led personal portfolio

**Audience:** Recruiters, hiring managers, and creative clients

**Design dials:** Variance 7/10 · Motion 3/10 · Density 3/10

## Principles

1. Oversized editorial type establishes a distinctive point of view without competing with project media.
2. Cobalt is the only accent; all other surfaces remain charcoal or neutral.
3. Numbered sections, thin borders, and generous whitespace create rhythm across the one-page experience.
4. Motion follows a restrained editorial system: a coordinated hero entrance, 12–16px section and card reveals, short child staggers, subtle media scaling, and direct interaction feedback. Every effect has a full reduced-motion fallback.
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

Use semantic responsive spacing tokens rather than route-specific values:

- Page inset: `48px` total on desktop and tablet, `32px` total on mobile.
- Primary section spacing: `clamp(112px, 10vw, 144px)`, reduced to `88px` on mobile.
- Compact section spacing: `clamp(88px, 8vw, 112px)`, reduced to `72px` on mobile.
- Section-heading gap: `clamp(48px, 5vw, 72px)`, reduced to `40px` on mobile.
- Project-card row gap: `clamp(64px, 6vw, 88px)`, reduced to `56px` on mobile.

Display typography scales continuously between breakpoints. Homepage section headings use `48–80px` on larger screens and `36–48px` on mobile. Descriptive body copy remains at least `16px` with a `1.6–1.75` line-height.

## Components

- Navigation: full-width sticky bar at the top that morphs into a compact 960px rectangular bar after 32px. Its About, Work, Tools, and Contact destinations use native `/#section` anchors in the header, mobile menu, and footer. Same-page selections update browser history and scroll to the target. Back, Forward, initial hashes, reduced motion, and mobile-menu closing remain supported. Offset homepage targets by `calc(var(--nav-height) + 24px)` so the sticky bar never hides a heading. A 2px cobalt bar along the bottom edge reports document scroll progress; in the rounded state, inset the track by the corner radius so it never crosses the shell edge. Use an 8px nested radius for the résumé control and 7px for the mobile disclosure control; the current section uses text emphasis and `aria-current="location"` rather than a competing underline.
- Theme control: dark by default, persisted in `edsun-theme`, initialized before paint, and exposed as a labeled button.
- Buttons: 48px minimum height, square editorial edges, cobalt primary and bordered secondary styles.
- Project categories: four visible homepage rows place the category name and description on the left and the completed-project count on the right. Each row is a fully opaque surface card with a 1px border, 12px radius, fluid 24–48px padding, and a very soft top-edge shadow that does not compound into a dark stack. Omit repeated category numbers and generic labels. Each row exposes its work immediately without a modal.
- Horizontal project lanes: use Embla Carousel as the interaction controller with start alignment, non-looping one-card movement, touch and mouse dragging, and trimmed end snaps. On desktop, use three equal cards for three-project categories; longer rows show three complete cards plus roughly 40% of a fourth. Tablet shows two complete cards plus roughly 30% of the third, and mobile shows one complete card plus roughly 20% of the second. Render 48px circular Lucide chevron controls at the image midpoint whenever Embla reports actual overflow, hide Previous at the starting edge, and disable Next at the ending edge. Apply state-aware masks to the complete viewport so partial media and copy fade cleanly at every active edge. Before hydration, preserve native horizontal scrolling, proximity snapping, keyboard access, and page-level overflow containment.
- Project cards: 4:3 media, category, year, outcome, and a destination-specific action. Use “View Project” for Behance work and “Watch Video” for Dropbox-hosted videos, with the external provider included in accessible labels. Use equal-height copy areas, reserve two title lines in multi-card layouts, and anchor actions to the bottom for clean alignment. Remove reserved title height on mobile.
- Scrollbars: use the cobalt accent on a transparent track across the document and internal scroll regions. Keep the thumb narrow with a restrained 5px radius and preserve native keyboard, wheel, and touch scrolling.
- Sections: visible two-digit numbering, thin dividers, and large display headings.
- Focus: 3px cobalt-family outline with 4px offset on every interactive element.

## Motion System

- Use `180ms` for hover and press feedback, `360ms` for section and card entrances, and `480ms` for the coordinated hero entrance.
- Use the shared enter curve `cubic-bezier(0.16, 1, 0.3, 1)` so incoming content settles quickly without overshoot.
- Stagger related children by `55ms`, keeping groups short enough that their complete reveal remains responsive.
- Reveal standard content from `12px`, project cards from `16px`, and large media with a subtle `.988` to `1` scale. Animate only opacity and transform.
- Run entrance sequences once when content enters the viewport. Preserve native scrolling and never pin sections or add parallax. The homepage hero may use the single documented low-opacity pointer spotlight as an exception to the general cursor-tracking restriction.
- Give buttons and linked project media short hover or press feedback without changing layout bounds.
- At `768px` and above, stack category cards with native CSS sticky positioning below the navigation. Offset each successive card by 16px and raise its stacking order so the incoming card settles above earlier cards. Motion maps each incoming inner card from `48px`, `.985` scale, and an alternating `-1.25deg` or `1.25deg` rotation to its level final state using direct scroll progress. Rotate around the top center and keep card opacity at 100% throughout so incoming content never blends with the card below. Keep sticky geometry separate from the transformed inner card, release the stack before the Behance action, and use normal document flow below `768px`.
- Server-render all content visible by default. Motion activates only when the client observer is ready, and reduced-motion users receive static, non-sticky cards in their final state immediately.

## Page Pattern

1. Impact-led hero with a supporting rotating role and grayscale portrait
2. Compact proof strip
3. About and core expertise
4. Four visible project categories with horizontal project lanes
5. Full-width client testimonial
6. Workflow tools marquee
7. Oversized contact close

## Avoid

- Decorative color beyond cobalt
- Heavy shadows, glass effects, pill-heavy UI, and excessive rounding
- Parallax, cursor tracking outside the homepage hero spotlight, scroll-jacking, unnecessary animation libraries, or motion without meaning
- Hover-only meaning, layout-shifting effects, and hidden focus rings
- Long résumé content on the homepage

## One-Page Routing

- The homepage is the complete portfolio experience.
- `/about` permanently redirects to `/#about` and `/work` permanently redirects to `/#selected-work`.
- Known `/work/[slug]` routes permanently redirect to the project’s reviewed Behance or Dropbox destination. Unknown slugs retain the not-found response.

## Delivery Checks

- Contrast meets WCAG AA in both themes.
- Keyboard order follows the visual order and a skip link is present.
- Touch targets are at least 44×44px.
- Images reserve space and below-fold media is lazy-loaded.
- Layouts hold at 375px, 768px, 1024px, and 1440px without horizontal scrolling.
- `prefers-reduced-motion` removes transforms and reveals content immediately.
