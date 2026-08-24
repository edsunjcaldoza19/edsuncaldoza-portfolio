import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(path = "/") {
  return worker.fetch(
    new Request(`https://portfolio.example${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const projects = [
  ["ai-business-model-landing-page", "AI Business Model Landing Page", "https://www.behance.net/gallery/238027647/AI-Business-Model-Landing-Page-Website-Design"],
  ["smart-income-streams-ai-sales-page", "Smart Income Streams with AI Sales Page", "https://www.behance.net/gallery/238320549/Smart-Income-Streams-with-AI-Long-Form-Sales-Page"],
  ["digital-marketing-campaign", "Digital Marketing Mastery Campaign", "https://www.behance.net/gallery/226541053/Digital-Marketing-Mastery-Webinar-Social-Media-Design"],
  ["wealth-webinar-presentation", "Wealth Webinar Slide System", "https://www.behance.net/gallery/226690009/Wealth-Google-Slides-Webinar-Template"],
  ["mastering-your-money-webinar", "Mastering Your Money Webinar", "https://www.behance.net/gallery/226745875/Mastering-Your-Money-Webinar-Template"],
  ["mastering-digital-marketing-webinar", "Mastering Digital Marketing Webinar", "https://www.behance.net/gallery/226721607/Mastering-Digital-Marketing-Webinar-Template"],
  ["blue-theme-webinar-deck", "Blue Theme Webinar Deck", "https://www.behance.net/gallery/238076371/Blue-Theme-Webinar-Google-Slides-Deck-Template"],
  ["social-media-marketing-webinar", "Social Media Marketing Webinar", "https://www.behance.net/gallery/238031503/Social-Media-Marketing-Webinar-Google-Slides-Template"],
  ["unlock-financial-freedom-webinar", "Unlock Financial Freedom Webinar", "https://www.behance.net/gallery/226718265/Unlock-Financial-Freedom-Webinar-Template"],
  ["page-whisper-mobile-app", "Page Whisper Reading App", "https://www.behance.net/gallery/226752305/Page-Whisper-Mobile-App-UI"],
  ["heart-health-book-cover", "Heart Health Made Simple", "https://www.behance.net/gallery/226851791/Heart-Health-Book-Cover-Template"],
  ["moonlight-car-rental-brochure", "Moonlight Car Rental Brochure", "https://www.behance.net/gallery/176567239/Dynamic-Brochure-Design-for-Your-Car-Rental-Service"],
  ["capcut-export-settings", "CapCut Export Settings for Crisp Video", "https://www.dropbox.com/scl/fi/zwuvh531mcnep968p83qf/Module-9.1.mp4?rlkey=jlmao5nu6ve4ig41rs61p0jr4&dl=0"],
  ["watermark-free-capcut-exports", "Watermark-Free CapCut Exports", "https://www.dropbox.com/scl/fi/r2zqv70yj2owfvkym04ad/Module-9.2.mp4?rlkey=lrdzkymohlmhp2gntwm6shk0i&dl=0"],
  ["capcut-covers-and-thumbnails", "CapCut Covers and Thumbnails", "https://www.dropbox.com/scl/fi/431bcw042ojmnck7pawzs/Module-9.3.mp4?rlkey=wsmfkjw55y5d88dfwzoic3g08&dl=0"],
];

test("downloadable resume uses the approved updated PDF", async () => {
  const resume = await readFile(new URL("../public/resume.pdf", import.meta.url));
  assert.equal(resume.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.equal(createHash("sha256").update(resume).digest("hex"), "e10d5de6139099ff20df7e623268d13510880c11fc2664ff2b5639bc72435f6a");
});

test("project media uses the approved local assets", async () => {
  const expectedAssets = [
    ["webinar-001.jpg", "2703304697c7e7c8cb82e2bf382948bb84d977605578bf414a5aae7d44b4af5a"],
    ["webinar-002.jpg", "0e1717a9e2c7281f8758273d78efced4f3230d5b26faebc00b8da5d9d114b888"],
    ["webinar-003.jpg", "22c0e4a3c9c15c0ea5df22c493bb22603042170635a42dbc716c4b5a7e4d5372"],
    ["webinar-004.jpg", "0676a74f8c280f53efc21b67e0241bdcc80ad698a5fccbde4c3b56ba84d2e77c"],
    ["webinar-005.jpg", "a4f1382ef2e1e53bb132044e861fc3fa71b0c4a415c4ed8b9d48fd0a0410d044"],
    ["web-001.jpg", "166e62788ee0b505980650c1c756cdcd81372b264e21face73a8e7c82b1cd118"],
    ["video-001.webp", "f3e3306f1ceaa4ba1be8fab39798263f1171a26be3062bfdec0651fbbc56ed5e"],
    ["video-002.webp", "a100356da18f33b422d9a3c6eceeaafbb59864cac22a8f599e6734da94a6517c"],
    ["video-003.webp", "a9e85b89ea019f6cd5301983ef1ca96d8b57c598b3899bd4b5d6076b7a14a19c"],
  ];
  for (const [name, hash] of expectedAssets) {
    const asset = await readFile(new URL(`../public/images/${name}`, import.meta.url));
    assert.equal(createHash("sha256").update(asset).digest("hex"), hash);
  }
});

test("homepage keeps the approved hero, proof, tools, and contact content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /I build Visuals[\s\S]*Connect[\s\S]*Convert/);
  assert.match(html, /Designer, Video Editor, and Creator/);
  assert.match(html, /hero-portrait-black-shirt\.png/);
  assert.match(html, /500(?:<!-- -->)?\+/);
  assert.match(html, /Graphic Design Projects/);
  assert.match(html, /50(?:<!-- -->)?\+/);
  assert.match(html, /Webinar Presentations/);
  assert.match(html, /70(?:<!-- -->)?\+/);
  assert.match(html, /Web Design Projects/);
  assert.match(html, /7(?:<!-- -->)?\+ years/);
  assert.match(html, /You bring the message\.[\s\S]*I help make it clear\./);
  assert.match(html, /Get to know me[\s\S]*through my work\./);
  assert.match(html, /Tools I use to get[\s\S]*the work done\./);
  assert.match(html, /Have a project[\s\S]*in mind\?/);
  assert.match(html, /See more work on Behance/);
  assert.match(html, /Such a great experience working with Edsun/);
  assert.doesNotMatch(html, /Learn more about me|I turn ideas into clear, memorable visuals/);
});

test("all project categories and projects are visible directly on the homepage", async () => {
  const response = await render();
  const html = await response.text();
  const categories = [
    ["Graphic Design", "3"],
    ["Webinar Presentations", "6"],
    ["Web Design", "3"],
    ["Video Editing", "3"],
  ];

  assert.equal((html.match(/class="project-category-row(?: project-category-row-overflow)?"/g) ?? []).length, 4);
  assert.equal((html.match(/class="project-category-card"/g) ?? []).length, 4);
  assert.equal((html.match(/class="gallery-project"/g) ?? []).length, 15);
  assert.equal((html.match(/class="project-carousel-track"/g) ?? []).length, 4);
  assert.equal((html.match(/class="project-carousel-controls"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /<dialog|aria-haspopup="dialog"|Close project gallery|dialog-open|<noscript>/);

  assert.doesNotMatch(html, /Project category/);

  for (const [title, count] of categories) {
    assert.match(html, new RegExp(escapeRegExp(title)));
    assert.match(html, new RegExp(`${count}(?:<!-- -->)?\\s*(?:<!-- -->)?projects`));
  }

  assert.match(html, /project-carousel-previous is-hidden[^>]*disabled=""[^>]*tabindex="-1"[^>]*aria-hidden="true"/);
  assert.match(html, /aria-label="Show next Webinar Presentations project"/);
  assert.equal((html.match(/>View Project(?:<!-- -->)?\s*<span aria-hidden="true">↗<\/span><\/a>/g) ?? []).length, 12);
  assert.equal((html.match(/>Watch Video(?:<!-- -->)?\s*<span aria-hidden="true">↗<\/span><\/a>/g) ?? []).length, 3);

  for (const [, title, url] of projects) {
    assert.match(html, new RegExp(escapeRegExp(title)));
    const renderedUrl = url.replaceAll("&", "&amp;");
    assert.equal((html.match(new RegExp(`href="${escapeRegExp(renderedUrl)}"`, "g")) ?? []).length, 3);
  }
});

test("horizontal project lanes implement responsive and accessible browsing", async () => {
  const [gallery, css, packageJson] = await Promise.all([
    readFile(new URL("../app/project-gallery.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"embla-carousel-react": "\^8\.6\.0"/);
  assert.match(packageJson, /"lucide-react": "\^1\.34\.0"/);
  assert.match(packageJson, /"motion": "\^13\.1\.1"/);
  assert.match(gallery, /import useEmblaCarousel from "embla-carousel-react"/);
  assert.match(gallery, /import \{ ChevronLeft, ChevronRight \} from "lucide-react"/);
  assert.match(gallery, /align: "start"/);
  assert.match(gallery, /containScroll: "trimSnaps"/);
  assert.match(gallery, /loop: false/);
  assert.match(gallery, /slidesToScroll: 1/);
  assert.match(gallery, /"\(prefers-reduced-motion: reduce\)": \{ duration: 0 \}/);
  assert.match(gallery, /tabIndex=\{0\}/);
  assert.match(gallery, /role="region"/);
  assert.match(gallery, /event\.key === "ArrowLeft"/);
  assert.match(gallery, /event\.key === "ArrowRight"/);
  assert.match(gallery, /emblaApi\.scrollPrev\(jump\)/);
  assert.match(gallery, /emblaApi\.scrollNext\(jump\)/);
  assert.match(gallery, /scrollSnapList\(\)\.length > 1/);
  assert.match(gallery, /canScrollPrev\(\)/);
  assert.match(gallery, /canScrollNext\(\)/);
  assert.match(gallery, /emblaApi\.on\("select", syncCarouselState\)/);
  assert.match(gallery, /emblaApi\.on\("reInit", syncCarouselState\)/);
  assert.match(gallery, /emblaApi\.off\("select", syncCarouselState\)/);
  assert.match(gallery, /emblaApi\.off\("reInit", syncCarouselState\)/);
  assert.match(gallery, /prefers-reduced-motion: reduce/);
  assert.match(gallery, /ResizeObserver/);
  assert.match(gallery, /--project-media-center/);
  assert.match(gallery, /mediaBox\.top - shellBox\.top \+ mediaBox\.height \/ 2/);
  assert.match(gallery, /\{carouselState\.hasOverflow && \(/);
  assert.match(gallery, /disabled=\{!carouselState\.canPrevious\}/);
  assert.match(gallery, /tabIndex=\{carouselState\.canPrevious \? 0 : -1\}/);
  assert.match(gallery, /aria-hidden=\{carouselState\.canPrevious \? undefined : true\}/);
  assert.match(gallery, /disabled=\{!carouselState\.canNext\}/);
  assert.match(gallery, /<ChevronLeft[^>]*size=\{22\}/);
  assert.match(gallery, /<ChevronRight[^>]*size=\{22\}/);
  assert.doesNotMatch(gallery, /track\.scrollBy|cards\[1\]\.offsetLeft|addEventListener\("scroll"|scheduleEdgeUpdate/);
  assert.doesNotMatch(gallery, /Project category|category\.number/);
  assert.doesNotMatch(gallery, /project-carousel-fade|<dialog|showModal|aria-haspopup|dialog-open|lastTriggerRef|<noscript>/);

  assert.match(css, /\.project-category-header[^}]*grid-template-columns:\s*minmax\(0, 1fr\) auto/s);
  assert.match(css, /\.project-carousel-controls[^}]*position:\s*absolute[^}]*top:\s*var\(--project-media-center, 0\)/s);
  assert.match(css, /\.project-carousel-controls button[^}]*position:\s*absolute[^}]*width:\s*48px[^}]*height:\s*48px[^}]*border-radius:\s*50%/s);
  assert.match(css, /\.project-carousel-controls button\.is-hidden[^}]*visibility:\s*hidden[^}]*opacity:\s*0[^}]*pointer-events:\s*none/s);
  assert.match(css, /\.project-carousel-shell[^}]*overflow:\s*hidden/s);
  assert.match(css, /\.project-carousel-viewport[^}]*overflow-x:\s*auto[^}]*scroll-snap-type:\s*x proximity/s);
  assert.match(css, /data-carousel-ready="true"[^}]*\.project-carousel-viewport[^}]*overflow:\s*hidden/s);
  assert.match(css, /\.project-carousel-track[^}]*display:\s*flex[^}]*gap:\s*24px[^}]*touch-action:\s*pan-y pinch-zoom/s);
  assert.match(css, /\.gallery-project[^}]*flex:\s*0 0 calc\(\(100% - 72px\) \/ 3\.4\)/s);
  assert.match(css, /data-project-count="3"[^}]*\.gallery-project[^}]*flex-basis:\s*calc\(\(100% - 48px\) \/ 3\)/s);
  assert.match(css, /@media \(max-width:\s*1024px\)[\s\S]*?flex-basis:\s*calc\(\(100% - 48px\) \/ 2\.3\)/);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*?flex-basis:\s*calc\(\(100% - 16px\) \/ 1\.2\)/);
  assert.doesNotMatch(css, /@media \(max-width:\s*1024px\)[\s\S]*?flex-basis:\s*calc\(\(100% - 24px\) \/ 2\)/);
  assert.doesNotMatch(css, /@media \(max-width:\s*767px\)[\s\S]*?flex-basis:\s*100%/);
  assert.match(css, /data-can-previous="false"\]\[data-can-next="true"\][^}]*-webkit-mask-image:[^}]*transparent 100%/s);
  assert.match(css, /data-can-previous="true"\]\[data-can-next="true"\][^}]*-webkit-mask-image:[^}]*transparent 0[^}]*transparent 100%/s);
  assert.match(css, /data-can-previous="true"\]\[data-can-next="false"\][^}]*-webkit-mask-image:[^}]*transparent 0/s);
  assert.match(css, /@supports not[\s\S]*?\.project-carousel-shell::before[^}]*left:\s*-1px[\s\S]*?\.project-carousel-shell::after[^}]*right:\s*-1px/);
  assert.doesNotMatch(css, /\.project-carousel-fade|grid-auto-columns:\s*calc\(\(100% - 48px\) \/ 2\.25\)|grid-auto-columns:\s*min\(82vw, 360px\)/);
  assert.doesNotMatch(css, /project-gallery-dialog|dialog-open|work-category-card|category-open/);
});

test("project categories use indexed sticky cards with accessible motion fallbacks", async () => {
  const [gallery, css, master, home] = await Promise.all([
    readFile(new URL("../app/project-gallery.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../design-system/edsun-portfolio/MASTER.md", import.meta.url), "utf8"),
    readFile(new URL("../design-system/edsun-portfolio/pages/home.md", import.meta.url), "utf8"),
  ]);

  assert.match(gallery, /import \{ motion, useReducedMotion, useScroll, useTransform \} from "motion\/react"/);
  assert.match(gallery, /const stackedCategoryQuery = "\(min-width: 768px\)"/);
  assert.match(gallery, /useSyncExternalStore\(/);
  assert.match(gallery, /target: stackRef/);
  assert.match(gallery, /offset: \["start 90%", "start 25%"\]/);
  assert.match(gallery, /trackContentSize: true/);
  assert.match(gallery, /useTransform\(scrollYProgress, \[0, 1\], \[48, 0\]\)/);
  assert.match(gallery, /useTransform\(scrollYProgress, \[0, 1\], \[0\.985, 1\]\)/);
  assert.match(gallery, /initialRotation = stackIndex % 2 === 0 \? -1\.25 : 1\.25/);
  assert.match(gallery, /useTransform\(scrollYProgress, \[0, 1\], \[initialRotation, 0\]\)/);
  assert.match(gallery, /style=\{animateIncomingCard \? \{ y: incomingY, scale: incomingScale, rotate: incomingRotate \} : undefined\}/);
  assert.doesNotMatch(gallery, /incomingOpacity|opacity: incomingOpacity|\[0\.78, 1\]/);
  assert.match(gallery, /animateIncomingCard = isStackedViewport && !shouldReduceMotion/);
  assert.match(gallery, /"--stack-index": stackIndex \+ 1/);
  assert.match(gallery, /"--stack-offset": `\$\{stackIndex \* 16\}px`/);
  assert.match(gallery, /<motion\.div[\s\S]*?className="project-category-card"/);
  assert.match(gallery, /workCategories\.map\(\(category, stackIndex\)/);
  assert.doesNotMatch(gallery, /project-category-header reveal|data-stagger/);

  assert.match(css, /\.project-category-card[^}]*padding:\s*clamp\(24px, 3\.5vw, 48px\)[^}]*opacity:\s*1[^}]*background:\s*var\(--surface\)[^}]*border-radius:\s*12px[^}]*box-shadow:\s*var\(--stack-card-shadow\)/s);
  assert.match(css, /\.project-category-card[^}]*transform-origin:\s*top center/s);
  assert.match(css, /--stack-card-shadow:\s*0 -6px 18px rgba\(0, 0, 0, \.06\)/);
  assert.match(css, /--stack-card-shadow:\s*0 -6px 18px rgba\(17, 19, 23, \.035\)/);
  assert.match(css, /@media \(min-width:\s*768px\)[\s\S]*?\.project-category-row\s*\{[^}]*position:\s*sticky[^}]*top:\s*calc\(var\(--nav-height\) \+ 24px \+ var\(--stack-offset\)\)/);
  assert.match(css, /\.project-category-row[^}]*z-index:\s*var\(--stack-index\)/s);
  assert.match(css, /@media \(max-width:\s*767px\)[\s\S]*?\.project-category-row[^}]*position:\s*relative[^}]*top:\s*auto[^}]*z-index:\s*auto/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.project-category-row[^}]*position:\s*relative !important[^}]*top:\s*auto !important[\s\S]*?\.project-category-card[^}]*opacity:\s*1 !important[^}]*transform:\s*none !important/);
  assert.match(master, /Offset each successive card by 16px/);
  assert.match(home, /Motion only on the inner category card/);
  assert.match(home, /keep opacity fixed at `1` throughout the entrance/i);
  assert.match(home, /alternating rotation from `-1\.25deg` or `1\.25deg` to `0deg`/);
});

test("legacy pages permanently redirect and unknown project slugs remain not found", async () => {
  for (const [path, expectedHash] of [["/about", "#about"], ["/work", "#selected-work"]]) {
    const response = await render(path);
    assert.equal(response.status, 308);
    assert.match(response.headers.get("location") ?? "", new RegExp(`${expectedHash}$`));
  }

  for (const [slug, , destination] of projects) {
    const response = await render(`/work/${slug}`);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), destination);
  }

  for (const slug of ["motion-video-reel", "short-form-social-edits", "not-a-real-project"]) {
    const response = await render(`/work/${slug}`);
    assert.equal(response.status, 404);
  }
});

test("navigation, theme, and one-page section links stay accessible", async () => {
  const [response, controls, components, layout] = await Promise.all([
    render(),
    readFile(new URL("../app/client-components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);
  const html = await response.text();
  for (const destination of ["about", "selected-work", "tools", "contact"]) {
    assert.equal((html.match(new RegExp(`href="\\/#${destination}"`, "g")) ?? []).length, 3);
  }
  assert.equal((html.match(/data-section-link="true"/g) ?? []).length, 12);
  assert.match(html, /aria-label="Toggle navigation menu"/);
  assert.match(html, /role="progressbar"/);
  assert.match(controls, /window\.history\.pushState/);
  assert.match(controls, /hashchange/);
  assert.match(controls, /popstate/);
  assert.match(controls, /prefers-reduced-motion: reduce/);
  assert.match(controls, /localStorage\.setItem\("edsun-theme"/);
  assert.match(components, /href: "\/#selected-work"/);
  assert.match(layout, /data-theme="dark"/);
  assert.match(layout, /localStorage\.getItem\('edsun-theme'\)/);
});

test("workflow tools remain continuous and become static for reduced motion", async () => {
  const [response, components, css] = await Promise.all([
    render(),
    readFile(new URL("../app/components.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  const html = await response.text();
  for (const tool of ["Adobe Photoshop", "Figma", "Canva", "CapCut", "WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL", "Microsoft Office Suite", "Google Workspace", "Google Slides"]) {
    assert.match(html, new RegExp(tool));
  }
  assert.match(components, /aria-hidden=\{duplicate \? "true" : undefined\}/);
  assert.match(css, /tools-marquee-scroll 48s linear infinite/);
  assert.match(css, /\.tools-list\[aria-hidden="true"\] \{ display:\s*none/);
  assert.doesNotMatch(html, /Pause tools carousel|Resume tools carousel/);
});

test("stored project detail records remain complete while detail pages redirect", async () => {
  const data = await readFile(new URL("../app/data.ts", import.meta.url), "utf8");
  assert.equal((data.match(/\n\s{4}slug: "/g) ?? []).length, 15);
  for (const field of ["client", "role", "tools", "deliverables", "challenge", "approach", "outcomeHeading", "result"]) {
    assert.equal((data.match(new RegExp(`\\n    ${field}:`, "g")) ?? []).length, 15);
  }
  assert.equal((data.match(/categoryId: "graphic-design"/g) ?? []).length, 3);
  assert.equal((data.match(/categoryId: "webinar-presentations"/g) ?? []).length, 6);
  assert.equal((data.match(/categoryId: "web-design"/g) ?? []).length, 3);
  assert.equal((data.match(/categoryId: "video-editing"/g) ?? []).length, 3);
});

test("user-facing source copy contains no em dash characters", async () => {
  const copyFiles = await Promise.all([
    "../app/page.tsx",
    "../app/data.ts",
    "../app/layout.tsx",
    "../app/project-gallery.tsx",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  assert.equal(copyFiles.join("\n").includes(String.fromCodePoint(0x2014)), false);
});

test("brand favicon is exposed with compatible fallbacks", async () => {
  const [layout, favicon, fallback, ico] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/favicon.png", import.meta.url)),
    readFile(new URL("../public/images/ico.png", import.meta.url)),
    readFile(new URL("../public/favicon.ico", import.meta.url)),
  ]);
  assert.match(layout, /\/favicon\.ico\?v=4/);
  assert.match(layout, /\/favicon\.png\?v=4/);
  assert.equal(favicon.equals(fallback), true);
  assert.equal(ico.subarray(22).equals(favicon), true);
});
