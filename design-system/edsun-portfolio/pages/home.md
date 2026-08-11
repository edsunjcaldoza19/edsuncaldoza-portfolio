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
- Combine “Hi, I’m Edsun -” with a smaller same-size role phrase that cycles upward through “A Designer.”, “Video Editor.”, and “Creator.” every three seconds. Keep the role intact when it wraps on narrow screens.
- Build the role animation as a vertically clipped CSS track with a repeated first item for a seamless nine-second loop. Reserve the longest phrase’s dimensions and keep reduced-motion experiences static on “A Designer.”
- Keep the animated phrase hidden from assistive technology, expose one stable text alternative containing the full introduction and all three identities, and use “I build Visual Experiences that Connect and Convert.” as the page’s single H1.
- Apply one synchronized, soft blue CSS gradient only to “Connect” and “Convert.” Stop the gradient motion for reduced-motion users and retain a readable cobalt fallback when text clipping is unsupported.
- Keep the headline on two controlled lines through tablet widths, then remove the forced break and allow up to three balanced lines on phones.
- Use 54px hero CTA controls and increase the vertically centered desktop portrait to a 480px maximum without changing its 4:5 crop.
- Stack the portrait below the complete CTA group on mobile.
- Keep the portrait in the hero only; About sections use text and expertise content without repeated portraits.
- Feature six internal case studies in a two-column desktop grid and one column on mobile.
- End with a full-width testimonial followed by an oversized contact statement.
