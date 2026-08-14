# Homepage Override

## Hero Grid

- The homepage hero uses one low-contrast square grid as its only decorative motif.
- Build the grid from two CSS linear gradients rather than an image, SVG, canvas, or JavaScript.
- Use 1px cobalt-family lines, 32px cells on desktop, and 40px cells at the mobile breakpoint.
- Fade the grid to transparent with an elliptical standard and `-webkit-` mask.
- Keep the grid static, non-interactive, `aria-hidden`, and behind all hero content.
- Do not add dots, circles, diamonds, diagonal marks, perspective, animation, or extra overlays.
- The grid adapts through semantic theme tokens and never appears outside the homepage hero.

## Homepage Rhythm

- Use a vertically centered two-column first viewport with the pitch and supporting content on the left and Edsun’s grayscale portrait on the right.
- Combine “Hi, I’m Edsun -” with a smaller same-size role phrase that cycles upward through “Designer”, “Video Editor”, and “Creator” every three seconds. Keep the role intact when it wraps on narrow screens.
- Build the role animation as a vertically clipped CSS track with a repeated first item for a seamless nine-second loop. Reserve the longest phrase’s dimensions and keep reduced-motion experiences static on “Designer”.
- Keep the animated phrase hidden from assistive technology, expose one stable text alternative containing the full introduction and all three identities, and use “I build Visuals that Connect and Convert.” as the page’s single H1.
- Apply one synchronized, soft blue CSS gradient only to “Connect” and “Convert.” Stop the gradient motion for reduced-motion users and retain a readable cobalt fallback when text clipping is unsupported.
- Keep the larger headline inside its grid column with a flexible `64–80px` desktop scale, a `54–64px` intermediate scale, and a `48–52px` stacked scale, with a `46px` fallback at `360px`. Prefer two lines, permit a third line when the column narrows, and never force a line wider than the copy column.
- On phones, insert a mobile break after “Visuals” and allow the remaining phrase to wrap into no more than three total lines. Keep individual gradient words intact.
- Use a flexible copy column plus a portrait column capped at `480px`, separated by a responsive `40–64px` gap. Both columns remain vertically centered and the copy column must use `min-width: 0` to prevent overlap.
- Use 54px hero CTA controls and increase the vertically centered desktop portrait to a 480px maximum without changing its 4:5 crop.
- Stack the portrait below the complete CTA group on mobile.
- Keep the portrait in the hero only; About sections use text and expertise content without repeated portraits.
- Use a padding-free, edge-aligned proof strip for `500+` graphic-design projects, `50+` webinar presentations, `70+` web-design projects, and `7+ years` of professional experience. Count numeric values once over 1.2 seconds when the strip enters view; reduced-motion and JavaScript-free experiences display the final values.
- Place each homepage section number and label on its own row, followed by the display title on a new line with a `20–24px` vertical gap. Use the shared responsive section and heading spacing tokens so tablet spacing does not inherit the full desktop rhythm.
- Feature six internal case studies in a two-column desktop grid and one column on mobile.
- Close Selected Work with a primary “View all Projects” button linking to Edsun’s Behance profile; retain each card’s internal case-study link.
- Follow the testimonial with section 04, Tools & workflow. Use the heading “Tools I use to get the work done.” and a continuous slow right-to-left carousel of locally stored, full-color workflow icons. Place each icon in a flat 72px circle on desktop and a 60px circle on mobile. Use white circle backgrounds in dark mode and transparent icon containers in light mode so the original brand colors remain visible. Keep one semantic tool list, mark the duplicate loop group as hidden from assistive technology, do not pause on hover or expose a pause control, and replace the marquee with a static wrapping grid under reduced motion.
- Renumber the oversized Contact close to section 05.

## Motion Override

- Introduce the hero copy in reading order with short `60ms` steps, then settle the portrait with a subtle fade and scale. Keep the entire sequence under one second.
- Stagger the proof points, expertise rows, testimonial content, and contact close using the shared `55ms` motion rhythm.
- Project cards reveal in each grid row with a short offset between columns. Media lifts by no more than `4px` on precise-pointer hover.
- Keep the role carousel, blue headline gradient, and slow tools marquee as the only looping motion. Disable all three, all entrance transforms, and interaction transforms under reduced motion.
- A homepage-only pointer spotlight may sit above the grid and behind all content. Use a `380–520px` feathered cobalt radial gradient, direct `requestAnimationFrame`-throttled pointer tracking, and a short opacity fade. Enable it only for fine hover pointers, disable it for touch and reduced motion, and keep its theme-specific opacity low enough that text and portrait contrast remain unchanged.

## Copy Voice

- Keep the homepage hero copy unchanged.
- Use direct, specific language everywhere else. Prefer concrete deliverables, decisions, and outcomes over abstract phrases about craft or purpose.
- Present video editing through the existing reel and project work without adding unverified software, employers, or performance metrics.
- Preserve approved statistics and client quotations exactly.
- Use vertical bars in page titles, the word `to` in date ranges, and no em dashes in user-facing copy.
- Lead every case study with a clear challenge and approach, then use a project-specific outcome heading rather than one generic result statement.
