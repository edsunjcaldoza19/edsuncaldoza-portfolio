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
- Lead with “Hi, I’m Edsun.”, cycle a supporting role label through “Graphic Designer,” “Web Designer,” and “Video Editor” every three seconds, then present “I make visuals that make an impact.” as the primary heading.
- Type, hold, and delete each role with a cobalt cursor; reduced-motion and JavaScript-disabled experiences remain static on “Graphic Designer.”
- Keep the animated role hidden from assistive technology, expose one stable text alternative containing all three roles, and use the selling pitch as the page’s single H1.
- Stack the portrait below the complete CTA group on mobile.
- Keep the portrait in the hero only; About sections use text and expertise content without repeated portraits.
- Feature six internal case studies in a two-column desktop grid and one column on mobile.
- End with a full-width testimonial followed by an oversized contact statement.
