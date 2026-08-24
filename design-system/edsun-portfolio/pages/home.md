# Homepage Override

## Hero Grid

- The homepage hero uses one low-contrast square grid as its only decorative motif, with a localized pointer response that brightens only the existing grid strokes.
- Build the grid from two CSS linear gradients rather than an image, SVG, canvas, or JavaScript.
- Use 1px cobalt-family lines, 32px cells on desktop, and 40px cells at the mobile breakpoint.
- Fade the grid to transparent with an elliptical standard and `-webkit-` mask.
- Keep the base grid static, non-interactive, `aria-hidden`, and behind all hero content. On fine pointers, reveal a brighter copy of the aligned grid through a soft mouse-positioned mask without adding a filled glow.
- Do not add dots, circles, diamonds, diagonal marks, perspective, animation, or extra overlays.
- The grid adapts through semantic theme tokens and never appears outside the homepage hero.

## Homepage Rhythm

- Use a vertically centered two-column first viewport with the pitch and supporting content on the left and Edsun’s grayscale portrait on the right.
- Combine “Hi, I’m Edsun -” with a smaller same-size role phrase that cycles upward through “Designer”, “Video Editor”, and “Creator” every 1.5 seconds. Keep the role intact when it wraps on narrow screens.
- Build the role animation as a vertically clipped CSS track with `1.25em` rows and a repeated first item for a seamless 4.5-second loop. Reserve the longest phrase’s dimensions and keep reduced-motion experiences static on “Designer”.
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
- Give About, Selected Work, Tools, and Contact stable IDs reached through native `/#section` links. Preserve the URL hash and browser history, and offset each target by the sticky navigation height plus 24px.
- Replace the homepage project list with four two-column category cards for Graphic Design, Webinar Presentations, Web Design, and Video Editing. Introduce them with “Get to know me through my work.” Each card invites the visitor to explore the relevant discipline, shows a representative visual, concise description, real-project count, and visible open-gallery affordance. Keep the title, description, and count on a shared left edge, with the category number anchored at the upper-right of the copy area; stack the cards on mobile.
- Open category work in one native dialog with a sticky heading, labeled 44px close control, three project columns on desktop, two on tablet, and one on mobile. Make the dialog full-screen below 768px, preserve Escape and backdrop dismissal, keep focus inside while open, restore focus to the trigger, and lock document scrolling.
- Keep all fifteen real projects connected to their reviewed external destination. Behance remains the destination for design work, while the three Video Editing projects use Dropbox previews and a clear “Watch Video” action. The Webinar Presentations gallery contains six completed projects, Web Design contains three, and Video Editing contains three completed CapCut tutorials with authentic frame-based thumbnails.
- Provide native `/work#category` links in a no-JavaScript fallback. Use a short fade-and-rise dialog entrance and remove transforms under reduced motion.
- Close Selected Work with a primary “See more work on Behance” button linking to Edsun’s Behance profile.
- Follow the testimonial with section 04, Tools & workflow. Use the direct title “Tools I use to get the work done.” and the supporting line “These are the tools I use to take your project from first layout to final delivery across print, video, and web.” Add a continuous slow right-to-left carousel of locally stored, full-color workflow icons. Place each icon in a flat 72px circle on desktop and a 60px circle on mobile. Use white circle backgrounds in dark mode and transparent icon containers in light mode so the original brand colors remain visible. Keep one semantic tool list, mark the duplicate loop group as hidden from assistive technology, do not pause on hover or expose a pause control, and replace the marquee with a static wrapping grid under reduced motion.
- Renumber the oversized Contact close to section 05.
- Keep the oversized Contact heading readable with a `.92` desktop line-height and `.94` mobile line-height so its two lines never overlap.

## Motion Override

- Introduce the hero copy in reading order with short `60ms` steps, then settle the portrait with a subtle fade and scale. Keep the entire sequence under one second.
- Stagger the proof points, expertise rows, testimonial content, and contact close using the shared `55ms` motion rhythm.
- Project cards reveal in each grid row with a short offset between columns. Media lifts by no more than `4px` on precise-pointer hover.
- Keep the role carousel, blue headline gradient, and slow tools marquee as the only looping motion. Disable all three, all entrance transforms, and interaction transforms under reduced motion.
- A homepage-only pointer highlight may sit above the base grid and behind all content. Use a full-size, pixel-aligned grid overlay revealed through a roughly `440px` feathered mask, direct `requestAnimationFrame`-throttled pointer tracking, and a short opacity fade. Only the grid strokes brighten. Enable it only for fine hover pointers, disable it for touch, reduced motion, and browsers without mask support, and keep its theme-specific contrast restrained.

## Copy Voice

- Keep the homepage hero copy unchanged.
- Use a light StoryBrand structure: the visitor brings the message or goal, and Edsun acts as the practical guide who helps make it clear.
- Speak directly to visitors across the homepage, About, Work, and case studies. Use concise, active sentences that explain what they can explore, what Edsun can help them communicate, and how they can get in touch.
- Balance client and recruiter needs: describe practical outcomes for client work while showing the range, reliability, and collaboration that remote teams expect.
- Prefer concrete deliverables, decisions, and outcomes over abstract phrases about craft or purpose. Use “you” naturally, without forcing it into every sentence or making claims that the portfolio cannot support.
- Present video editing through the three CapCut tutorial projects without adding unverified employers or performance metrics.
- Preserve approved statistics and client quotations exactly.
- Avoid inflated claims, artificial urgency, generic marketing language, and repetitive “See how,” “Explore,” or “Watch how” openings across project summaries.
- Use vertical bars in page titles, the word `to` in date ranges, and no em dashes in user-facing copy.
- Lead every case study with a clear challenge and approach, then use a project-specific outcome heading rather than one generic result statement.
