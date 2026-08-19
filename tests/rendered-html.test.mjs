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

test("downloadable resume uses the approved updated PDF", async () => {
  const resume = await readFile(new URL("../public/resume.pdf", import.meta.url));
  assert.equal(resume.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.equal(
    createHash("sha256").update(resume).digest("hex"),
    "e10d5de6139099ff20df7e623268d13510880c11fc2664ff2b5639bc72435f6a",
  );
});

test("new portfolio project images use the supplied assets", async () => {
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

test("home presents the role-focused hero and recruiter/client paths", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Hi, I(?:&apos;|&#x27;|’)m Edsun -/);
  assert.match(html, /I build Visuals[\s\S]*that/);
  assert.doesNotMatch(html, /Visual Experiences/);
  assert.match(html, /class="hero-gradient-word">Connect<\/span> and <span class="hero-gradient-word">Convert<\/span>\./);
  assert.match(html, /Hi, I(?:&apos;|&#x27;|’)m Edsun\. Designer, Video Editor, and Creator\./);
  assert.match(html, /class="hero-title-break"/);
  assert.equal((html.match(/class="role-track-item"/g) ?? []).length, 4);
  assert.match(html, /hero-portrait-black-shirt\.png/);
  assert.match(html, /fetchPriority="high"|fetchpriority="high"/i);
  assert.match(html, /View selected work/);
  assert.match(html, /work together/);
  assert.match(html, /href="\/resume\.pdf"/);
  assert.match(html, /edsunjcaldoza@gmail\.com/);
  assert.match(html, /class="hero-pattern" aria-hidden="true"/);
  assert.match(html, /class="hero-grid-highlight" aria-hidden="true"/);
  assert.match(html, /500(?:<!-- -->)?\+/);
  assert.match(html, /Graphic Design Projects/);
  assert.match(html, /50(?:<!-- -->)?\+/);
  assert.match(html, /Webinar Presentations/);
  assert.match(html, /70(?:<!-- -->)?\+/);
  assert.match(html, /Web Design Projects/);
  assert.match(html, /7(?:<!-- -->)?\+ years/);
  assert.match(html, /Professional experience/);
  assert.match(html, /data-count-strip/);
  assert.match(html, /data-count-to="500"/);
  assert.match(html, /data-count-suffix="\+ years"/);
  assert.doesNotMatch(html, /1,000\+|Cover templates designed|Worldwide|Remote collaboration|Professional creative work/);
  assert.match(html, /About &amp; expertise/);
  assert.match(html, /Design that helps your[s\S]*message land\./);
  assert.match(html, /If you need a clear way to share your message/);
  assert.match(html, /If your video needs to hold attention/);
  assert.doesNotMatch(html, /Learn more about me/);
  assert.match(html, /Get to know me[s\S]*through my work\./);
  const categories = [
    ["01", "Graphic Design", "See how I turn ideas into clear graphics, covers, and campaign pieces.", "3 projects", "/images/project-2.jpg"],
    ["02", "Webinar Presentations", "Explore slide systems that help people follow the story and stay engaged.", "6 projects", "/images/project-3.jpg"],
    ["03", "Web Design", "See how I organize content into pages and interfaces that guide the next step.", "3 projects", "/images/project-1.jpg"],
    ["04", "Video Editing", "Watch tutorials and edits built to keep each idea clear and moving.", "3 projects", "/images/video-001.webp"],
  ];
  assert.equal((html.match(/class="work-category-card reveal"/g) ?? []).length, 4);
  assert.equal((html.match(/aria-haspopup="dialog"/g) ?? []).length, 4);
  for (const [number, title, description, count, image] of categories) {
    assert.match(html, new RegExp(`>${number}<`));
    assert.match(html, new RegExp(escapeRegExp(title)));
    assert.match(html, new RegExp(escapeRegExp(description)));
    const [countValue, countLabel] = count.split(" ");
    assert.match(html, new RegExp(`${countValue}(?:<!-- -->)?\\s*(?:<!-- -->)?${countLabel}`));
    if (image) assert.match(html, new RegExp(`src="${escapeRegExp(image)}"`));
  }
  assert.match(html, /class="project-gallery-dialog"/);
  assert.match(html, /aria-labelledby="project-gallery-title"/);
  assert.match(html, /href="\/work#graphic-design"/);
  assert.match(html, /href="\/work#video-editing"/);
  assert.match(html, /View all Projects/);
  assert.match(html, /class="button button-primary selected-work-cta" href="https:\/\/www\.behance\.net\/edsuncaldoza"/);
  assert.match(html, /Client feedback/);
  assert.match(html, /Such a great experience working with Edsun/);
  assert.match(html, /Tools &amp; workflow/);
  assert.match(html, /Tools I use to get[\s\S]*the work done\./);
  assert.match(html, /Here are the tools I rely on to move your idea from first layout to final delivery across print, video, and web\./);
  for (const tool of ["Adobe Photoshop", "Figma", "Canva", "CapCut", "WordPress", "HTML", "CSS", "JavaScript", "PHP", "MySQL", "Microsoft Office Suite", "Google Workspace", "Google Slides"]) {
    assert.match(html, new RegExp(tool));
  }
  assert.match(html, /aria-label="Workflow tools"/);
  assert.match(html, /class="tools-list" aria-hidden="true"/);
  assert.doesNotMatch(html, /tool-tile-monochrome/);
  assert.doesNotMatch(html, /Pause tools carousel|Resume tools carousel|tools-marquee-toggle|data-paused/);
  assert.match(html, /<span>05<\/span>Contact/);
  assert.match(html, /Available worldwide/);
  assert.match(html, /Have a project[\s\S]*in mind\?/);
  assert.match(html, /Tell me what you need to communicate\./);
  assert.match(html, /Start a conversation/);
  assert.match(html, /aria-label="Switch to light theme"/);
  assert.match(html, /role="progressbar"/);
  assert.match(html, /aria-label="Page scroll progress"/);
  assert.match(html, /aria-valuenow="0"/);
  assert.match(html, /aria-label="Toggle navigation menu"/);
  assert.match(html, /data-scrolled="false"/);
  assert.equal((html.match(/href="\/#about"/g) ?? []).length, 3);
  assert.equal((html.match(/href="\/#selected-work"/g) ?? []).length, 3);
  assert.equal((html.match(/href="\/#tools"/g) ?? []).length, 3);
  assert.equal((html.match(/href="\/#contact"/g) ?? []).length, 3);
  assert.equal((html.match(/data-section-link="true"/g) ?? []).length, 12);
  assert.match(html, /id="about"/);
  assert.match(html, /id="tools"/);
  assert.doesNotMatch(html, /id="skills"/);
  assert.doesNotMatch(html, /<h1[^>]*>Designing/);
  assert.doesNotMatch(html, /I turn ideas into clear, memorable visuals/);
  assert.doesNotMatch(html, /Ideas made visible|Six projects|Let(?:’|&apos;|&#x27;)s build/);
  assert.doesNotMatch(html, /class="about-portrait/);
  assert.doesNotMatch(html, /Available for select projects|Have something in mind\?|footer-lead|footer-cta/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Alex Morgan/);
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.hero-pattern/);
  assert.match(css, /\.hero-grid-highlight/);
  assert.match(css, /--hero-grid-highlight/);
  assert.match(css, /background-image:\s*linear-gradient\(var\(--hero-grid-highlight\) 1px, transparent 1px\), linear-gradient\(90deg, var\(--hero-grid-highlight\) 1px, transparent 1px\)/);
  assert.match(css, /radial-gradient\(circle 220px at var\(--hero-grid-x\) var\(--hero-grid-y\)/);
  assert.match(css, /\.hero-grid-highlight[^}]*inset:\s*0[^}]*background-size:\s*32px 32px/s);
  assert.match(css, /pointer-events:\s*none/);
  assert.doesNotMatch(css, /hero-pointer-glow|--hero-glow-center|--hero-glow-mid|translate3d\(var\(--hero-glow-x\)/);
  assert.match(css, /@media \(hover: none\), \(pointer: coarse\)/);
  assert.match(css, /-webkit-mask-image/);
  assert.match(css, /background-size:\s*32px 32px/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.hero-pattern[^}]*background-size:\s*40px 40px[\s\S]*?\.hero-grid-highlight \{ background-size:\s*40px 40px; \}/);
  assert.match(css, /html\[data-theme="light"\]/);
  assert.match(css, /html\[data-motion="ready"\] \.reveal/);
  assert.match(css, /--motion-fast:\s*180ms/);
  assert.match(css, /--motion-base:\s*360ms/);
  assert.match(css, /--motion-slow:\s*480ms/);
  assert.match(css, /--motion-stagger:\s*55ms/);
  assert.match(css, /@keyframes hero-content-enter/);
  assert.match(css, /@keyframes hero-portrait-enter/);
  assert.match(css, /\.reveal\[data-stagger\] > \*/);
  assert.match(css, /\.reveal\[data-reveal="media"\]/);
  assert.match(css, /calc\(var\(--motion-order, 0\) \* var\(--motion-stagger\)\)/);
  assert.match(css, /\.site-header\[data-scrolled="true"\]/);
  assert.match(css, /width:\s*min\(calc\(100% - 64px\), 960px\)/);
  assert.match(css, /\.site-header\[data-scrolled="true"\] \.nav-inner[^}]*--nav-corner-radius:\s*12px;[^}]*--progress-edge-inset:\s*11px/s);
  assert.match(css, /\.scroll-progress/);
  assert.match(css, /\.scroll-progress[^}]*right:\s*var\(--progress-edge-inset\)[^}]*bottom:\s*0[^}]*left:\s*var\(--progress-edge-inset\)/s);
  assert.match(css, /transform:\s*scaleX\(var\(--scroll-progress\)\)/);
  assert.match(css, /\.site-header\[data-scrolled="true"\] \.nav-resume \{ border-radius:\s*8px; \}/);
  assert.match(css, /\.site-header\[data-scrolled="true"\] \.mobile-nav summary \{ border-radius:\s*7px; \}/);
  assert.match(css, /--nav-corner-radius:\s*10px; --progress-edge-inset:\s*9px;/);
  assert.doesNotMatch(css, /\.nav-inner\s*\{[^}]*overflow:\s*(?:hidden|clip)/s);
  assert.match(css, /\.hamburger-icon/);
  assert.match(css, /\.mobile-nav\[open\] \.hamburger-icon/);
  assert.doesNotMatch(css, /\.brand\.active::after/);
  assert.match(css, /\.hero[^}]*grid-template-columns:\s*minmax\(0, 1fr\) minmax\(360px, 480px\)[^}]*gap:\s*clamp\(40px, 4vw, 64px\)/s);
  assert.match(css, /\.hero-copy[^}]*min-width:\s*0[^}]*max-width:\s*100%/s);
  assert.match(css, /\.hero-portrait[^}]*align-self:\s*center/s);
  assert.match(css, /filter:\s*grayscale\(1\)\s+contrast\(1\.06\)/);
  assert.match(css, /\.role-viewport[^}]*width:\s*13ch[^}]*height:\s*1\.25em[^}]*overflow:\s*hidden/s);
  assert.match(css, /@keyframes role-scroll-up/);
  assert.match(css, /\.role-track[^}]*grid-auto-rows:\s*1\.25em[^}]*animation:\s*role-scroll-up 4\.5s/s);
  assert.match(css, /\.role-track-item[^}]*height:\s*1\.25em[^}]*line-height:\s*1\.25/s);
  assert.match(css, /0%, 26\.67%[^}]*translateY\(0\)[\s\S]*33\.33%, 60%[^}]*translateY\(-25%\)[\s\S]*66\.67%, 93\.33%[^}]*translateY\(-50%\)/);
  assert.match(css, /translateY\(-75%\)/);
  assert.match(css, /\.role-track \{ animation:\s*none !important; transform:\s*none !important;/);
  assert.match(css, /\.hero-actions \.button[^}]*min-height:\s*54px[^}]*padding:\s*0 24px/s);
  assert.match(css, /\.hero-portrait[^}]*480px/s);
  assert.match(css, /\.hero-title-line \{ white-space:\s*normal;/);
  assert.doesNotMatch(css, /\.hero-title-line \{ white-space:\s*nowrap;/);
  assert.match(css, /\.hero-title-break \{ display:\s*none;/);
  assert.match(css, /\.hero-title-mobile-break \{ display:\s*none;/);
  assert.match(css, /\.hero-title-mobile-break \{ display:\s*block;/);
  assert.match(css, /\.hero-pitch[^}]*max-width:\s*100%[^}]*font-size:\s*clamp\(64px, 5\.2vw, 80px\)[^}]*line-height:\s*\.92/s);
  assert.match(css, /@media \(max-width:\s*1200px\)[\s\S]*?\.hero-pitch \{ font-size:\s*clamp\(54px, 5\.2vw, 64px\)/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.hero-pitch \{[^}]*font-size:\s*clamp\(48px, 6\.8vw, 52px\)/);
  assert.doesNotMatch(css, /clamp\(48px, 11\.5vw, 60px\)/);
  assert.match(css, /\.role-heading-visual[^}]*flex-wrap:\s*nowrap/s);
  assert.match(css, /\.role-viewport[^}]*flex:\s*0 0 13ch/s);
  assert.match(css, /\.hero-gradient-word/);
  assert.match(css, /background-clip:\s*text/);
  assert.match(css, /hero-gradient-shift 6s ease-in-out infinite alternate/);
  assert.match(css, /\.hero-gradient-word \{ animation:\s*none !important;/);
  assert.doesNotMatch(css, /\.hero-intro/);
  assert.match(css, /--page-inset:\s*48px;/);
  assert.match(css, /--space-section:\s*clamp\(112px, 10vw, 144px\)/);
  assert.match(css, /--space-compact:\s*clamp\(88px, 8vw, 112px\)/);
  assert.match(css, /--space-heading:\s*clamp\(48px, 5vw, 72px\)/);
  assert.match(css, /--space-card-row:\s*clamp\(64px, 6vw, 88px\)/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?--page-inset:\s*32px;[^}]*--space-section:\s*88px;[^}]*--space-compact:\s*72px;[^}]*--space-heading:\s*40px;[^}]*--space-card-row:\s*56px;/);
  assert.match(css, /\.nav-inner[^}]*width:\s*min\(calc\(100% - var\(--page-inset\)\), var\(--content\)\)/s);
  assert.match(css, /\.section-intro \{ margin-bottom:\s*var\(--space-heading\); display:\s*block; \}/);
  assert.match(css, /\.section-intro \.section-label \{ margin-bottom:\s*24px; \}/);
  assert.match(css, /\.section-intro h2[^}]*font-size:\s*clamp\(48px, 6vw, 80px\)/s);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.section-intro h2 \{ font-size:\s*clamp\(36px, 8\.5vw, 48px\)/);
  assert.doesNotMatch(css, /\.section-intro[^}]*grid-template-columns:\s*220px 1fr/s);
  assert.match(css, /\.proof-strip \{ width:\s*min\(calc\(100% - var\(--page-inset\)\), var\(--content\)\);[^}]*padding:\s*0;/s);
  assert.match(css, /\.home-about, \.selected-work \{ padding:\s*var\(--space-section\) 0/);
  assert.match(css, /\.home-about\[id\], \.selected-work\[id\], \.tools-section\[id\], \.contact-close\[id\] \{ scroll-margin-top:\s*calc\(var\(--nav-height\) \+ 24px\); \}/);
  assert.match(css, /\.project-grid[^}]*gap:\s*var\(--space-card-row\) 28px/s);
  assert.match(css, /\.work-category-grid[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/s);
  assert.match(css, /\.work-category-card[^}]*cursor:\s*pointer/s);
  assert.match(css, /\.work-category-meta \{[^}]*position:\s*relative;[^}]*display:\s*flex;[^}]*flex-direction:\s*column;[^}]*align-items:\s*flex-start;/s);
  assert.match(css, /\.work-category-number \{[^}]*position:\s*absolute;[^}]*top:\s*clamp\(24px, 3vw, 36px\);[^}]*right:\s*clamp\(24px, 3vw, 36px\);/s);
  assert.match(css, /\.work-category-title \{[^}]*width:\s*100%;[^}]*padding-right:\s*56px;/s);
  assert.match(css, /\.work-category-count \{[^}]*margin-top:\s*auto;[^}]*padding-top:\s*24px;/s);
  assert.doesNotMatch(css, /\.work-category-description[^}]*grid-column:/s);
  assert.match(css, /\.project-gallery-dialog[^}]*1180px[^}]*max-height:\s*min\(90dvh, 900px\)/s);
  assert.match(css, /\.project-gallery-grid, \.project-slot-grid[^}]*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/s);
  assert.match(css, /--scrollbar-thumb:\s*#2563eb/);
  assert.match(css, /--scrollbar-thumb-hover:\s*#3b82f6/);
  assert.match(css, /scrollbar-color:\s*var\(--scrollbar-thumb\) var\(--scrollbar-track\)/);
  assert.match(css, /\*::-webkit-scrollbar-thumb \{[^}]*background:\s*var\(--scrollbar-thumb\);[^}]*border-radius:\s*5px;/s);
  assert.match(css, /\.gallery-project \{[^}]*height:\s*100%[^}]*display:\s*grid[^}]*grid-template-rows:\s*auto 1fr/s);
  assert.match(css, /\.gallery-project-copy \{[^}]*display:\s*flex[^}]*flex-direction:\s*column/s);
  assert.match(css, /\.gallery-project-copy h3 \{[^}]*min-height:\s*2\.24em/s);
  assert.match(css, /\.gallery-project-copy \.text-link \{ margin-top:\s*auto; \}/);
  assert.match(css, /\.project-card \{[^}]*height:\s*100%[^}]*display:\s*grid/s);
  assert.match(css, /\.project-meta h3 \{[^}]*min-height:\s*2\.16em/s);
  assert.match(css, /\.project-meta \.text-link \{ margin-top:\s*auto; \}/);
  assert.match(css, /@media \(max-width:\s*1024px\)[\s\S]*?\.project-gallery-grid, \.project-slot-grid \{ grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.project-gallery-dialog \{[^}]*width:\s*100%[^}]*height:\s*100dvh/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.project-gallery-grid, \.project-slot-grid \{ grid-template-columns:\s*1fr/);
  assert.match(css, /html\.dialog-open, html\.dialog-open body \{ overflow:\s*hidden;/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.project-gallery-dialog\[open\][^}]*animation:\s*none !important/);
  assert.match(css, /\.tools-track[^}]*animation:\s*tools-marquee-scroll 48s linear infinite/s);
  assert.match(css, /@keyframes tools-marquee-scroll[^}]*translate3d\(0, 0, 0\)[\s\S]*?translate3d\(-50%, 0, 0\)/s);
  assert.match(css, /\.tools-marquee[^}]*overflow:\s*hidden[^}]*-webkit-mask-image:\s*linear-gradient/s);
  assert.match(css, /--tool-icon-background:\s*#ffffff/);
  assert.match(css, /html\[data-theme="light"\][^}]*--tool-icon-background:\s*transparent/s);
  assert.match(css, /\.tool-tile[^}]*width:\s*72px[^}]*height:\s*72px[^}]*background:\s*var\(--tool-icon-background\)[^}]*border:\s*0[^}]*border-radius:\s*50%[^}]*box-shadow:\s*none/s);
  assert.match(css, /\.tool-tile img \{ width:\s*48px; height:\s*48px; object-fit:\s*contain; \}/);
  assert.doesNotMatch(css, /tool-tile-monochrome|brightness\(0\) invert\(1\)/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.tool-tile \{ width:\s*60px; height:\s*60px;[^}]*padding:\s*10px;[^}]*\}[\s\S]*?\.tool-tile img \{ width:\s*40px; height:\s*40px;/);
  assert.match(css, /\.tools-list\[aria-hidden="true"\] \{ display:\s*none;/);
  assert.doesNotMatch(css, /tools-marquee-toggle|tools-marquee-wrap|pause-icon|play-icon|data-paused|animation-play-state|\.tools-marquee:hover|--tool-tile(?:-|:)/);
  assert.match(css, /\.work-hero h1, \.about-hero h1[^}]*font-size:\s*clamp\(56px, 8vw, 112px\)/s);
  assert.match(css, /\.case-heading h1[^}]*font-size:\s*clamp\(56px, 8vw, 124px\)/s);
  assert.match(css, /\.about-story div p, \.case-narrative div > p[^}]*max-width:\s*var\(--reading\)[^}]*font-size:\s*clamp\(16px, 1\.4vw, 17px\)/s);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.work-hero h1, \.about-hero h1 \{ font-size:\s*clamp\(44px, 10vw, 56px\)/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.case-heading h1 \{ font-size:\s*clamp\(44px, 10vw, 56px\)/);
  assert.match(css, /\.contact-close h2 \{[^}]*font-size:\s*clamp\(76px, 12vw, 176px\)[^}]*line-height:\s*\.92/s);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.contact-close h2 \{ font-size:\s*clamp\(60px, 17vw, 88px\); line-height:\s*\.94;/);
  assert.doesNotMatch(css, /\.section-intro h2 \{ font-size:\s*48px; \}/);
});

test("categorized work gallery uses native dialog behavior and a shared taxonomy", async () => {
  const [gallery, data, workPage] = await Promise.all([
    readFile(new URL("../app/project-gallery.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/work/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(data, /export type WorkCategoryId = "graphic-design" \| "webinar-presentations" \| "web-design" \| "video-editing"/);
  assert.match(data, /export type ProjectSlot =/);
  assert.match(data, /kind: "project"/);
  assert.match(data, /kind: "placeholder"/);
  assert.equal((data.match(/summary: "Project coming soon\."/g) ?? []).length, 0);
  assert.match(data, /externalUrl\?: string/);
  assert.match(data, /externalPlatform\?: string/);
  assert.match(data, /externalAction\?: string/);
  assert.match(data, /categoryId: "graphic-design"/);
  assert.match(data, /categoryId: "webinar-presentations"/);
  for (const [title, image, url] of [
    ["Smart Income Streams with AI Sales Page", "/images/web-001.jpg", "https://www.behance.net/gallery/238320549/Smart-Income-Streams-with-AI-Long-Form-Sales-Page"],
    ["Mastering Your Money Webinar", "/images/webinar-001.jpg", "https://www.behance.net/gallery/226745875/Mastering-Your-Money-Webinar-Template"],
    ["Mastering Digital Marketing Webinar", "/images/webinar-002.jpg", "https://www.behance.net/gallery/226721607/Mastering-Digital-Marketing-Webinar-Template"],
    ["Blue Theme Webinar Deck", "/images/webinar-003.jpg", "https://www.behance.net/gallery/238076371/Blue-Theme-Webinar-Google-Slides-Deck-Template"],
    ["Social Media Marketing Webinar", "/images/webinar-004.jpg", "https://www.behance.net/gallery/238031503/Social-Media-Marketing-Webinar-Google-Slides-Template"],
    ["Unlock Financial Freedom Webinar", "/images/webinar-005.jpg", "https://www.behance.net/gallery/226718265/Unlock-Financial-Freedom-Webinar-Template"],
  ]) {
    assert.match(data, new RegExp(escapeRegExp(title)));
    assert.match(data, new RegExp(escapeRegExp(image)));
    assert.match(data, new RegExp(escapeRegExp(url)));
  }
  assert.match(data, /categoryId: "web-design"/);
  assert.match(data, /imageAlt: "Smart Income Streams with AI sales page shown on desktop, laptop, tablet, and mobile screens"/);
  assert.doesNotMatch(data, /web-design-03/);
  assert.equal((data.match(/categoryId: "video-editing"/g) ?? []).length, 3);
  assert.doesNotMatch(data, /video-editing-0[123]/);
  for (const [title, image, url] of [
    ["CapCut Export Settings for Crisp Video", "/images/video-001.webp", "https://www.dropbox.com/scl/fi/zwuvh531mcnep968p83qf/Module-9.1.mp4?rlkey=jlmao5nu6ve4ig41rs61p0jr4&dl=0"],
    ["Watermark-Free CapCut Exports", "/images/video-002.webp", "https://www.dropbox.com/scl/fi/r2zqv70yj2owfvkym04ad/Module-9.2.mp4?rlkey=lrdzkymohlmhp2gntwm6shk0i&dl=0"],
    ["CapCut Covers and Thumbnails", "/images/video-003.webp", "https://www.dropbox.com/scl/fi/431bcw042ojmnck7pawzs/Module-9.3.mp4?rlkey=wsmfkjw55y5d88dfwzoic3g08&dl=0"],
  ]) {
    assert.match(data, new RegExp(escapeRegExp(title)));
    assert.match(data, new RegExp(escapeRegExp(image)));
    assert.match(data, new RegExp(escapeRegExp(url)));
  }
  assert.match(data, /previewImage: "\/images\/video-001\.webp"/);
  assert.match(gallery, /projectActionLabel/);
  assert.match(gallery, /projectExternalPlatform/);
  assert.match(gallery, /projectExternalUrl/);
  assert.match(gallery, /<dialog/);
  assert.match(gallery, /showModal\(\)/);
  assert.match(gallery, /aria-haspopup="dialog"/);
  assert.match(gallery, /aria-label="Close project gallery"/);
  assert.match(gallery, /dialog\.addEventListener\("cancel"/);
  assert.match(gallery, /dialog\.addEventListener\("click", handleBackdropClick\)/);
  assert.match(gallery, /document\.documentElement\.classList\.add\("dialog-open"\)/);
  assert.match(gallery, /lastTriggerRef\.current\?\.focus\(\)/);
  assert.match(gallery, /<noscript>/);
  assert.match(workPage, /workCategories\.map/);
  assert.match(workPage, /projectSlotsForCategory/);
});

test("section navigation stays native and consistent across application routes", async () => {
  const routes = ["/", "/about", "/work", "/work/ai-business-model-landing-page"];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200);
    const html = await response.text();
    for (const destination of ["about", "selected-work", "tools", "contact"]) {
      assert.equal((html.match(new RegExp(`href="\\/#${destination}"`, "g")) ?? []).length, 3);
    }
    assert.equal((html.match(/data-section-link="true"/g) ?? []).length, 12);
  }
});

test("navigation and rotating roles use the specified accessible behavior", async () => {
  const controls = await readFile(new URL("../app/client-components.tsx", import.meta.url), "utf8");
  assert.match(controls, /\["Designer", "Video Editor", "Creator"\]/);
  assert.doesNotMatch(controls, /"A Designer\."|"Graphic Designer"|"Web Designer"/);
  assert.match(controls, /window\.scrollY > 32/);
  assert.match(controls, /requestAnimationFrame/);
  assert.match(controls, /passive: true/);
  assert.match(controls, /scrollHeight - window\.innerHeight/);
  assert.match(controls, /Math\.min\(1, Math\.max\(0, ratio\)\)/);
  assert.match(controls, /--scroll-progress/);
  assert.match(controls, /aria-valuenow/);
  assert.match(controls, /\[data-nav-section\]/);
  assert.match(controls, /aria-current", "location"/);
  assert.match(controls, /mobileMenu\?\.removeAttribute\("open"\)/);
  assert.match(controls, /\[data-section-link\]/);
  assert.match(controls, /window\.history\.pushState/);
  assert.match(controls, /scrollIntoView\(\{ behavior:\s*scrollBehavior\(\), block:\s*"start" \}\)/);
  assert.match(controls, /window\.addEventListener\("hashchange", handleHistoryNavigation\)/);
  assert.match(controls, /window\.addEventListener\("popstate", handleHistoryNavigation\)/);
  assert.match(controls, /pathname === "\/" && destination\.pathname === "\/"/);
  assert.match(controls, /event\.metaKey[\s\S]*event\.ctrlKey[\s\S]*event\.shiftKey[\s\S]*event\.altKey/);
  assert.match(controls, /ResizeObserver/);
  assert.match(controls, /prefers-reduced-motion: reduce/);
  assert.match(controls, /export function HeroGridHighlight/);
  assert.match(controls, /\(hover: hover\) and \(pointer: fine\)/);
  assert.match(controls, /pointerenter/);
  assert.match(controls, /pointermove/);
  assert.match(controls, /pointerleave/);
  assert.match(controls, /getBoundingClientRect/);
  assert.match(controls, /--hero-grid-x/);
  assert.match(controls, /--hero-grid-y/);
  assert.doesNotMatch(controls, /HeroPointerGlow|--hero-glow-x|--hero-glow-y/);
  assert.match(controls, /element\.hasAttribute\("data-stagger"\)/);
  assert.match(controls, /--motion-order/);
  assert.match(controls, /usePathname/);
  assert.match(controls, /initiallyVisible/);
  assert.match(controls, /requestAnimationFrame\(\(\) =>/);
  assert.match(controls, /aria-hidden="true"/);
  assert.doesNotMatch(controls, /aria-live/);
  assert.match(controls, /\.\.\.portfolioRoles, portfolioRoles\[0\]/);
  assert.doesNotMatch(controls, /characterIndex|deleting|typing-cursor|setTimeout/);
  assert.doesNotMatch(controls, /gsap|framer-motion|motion\/react/i);
  assert.match(controls, /export function CountUpObserver/);
  assert.doesNotMatch(controls, /WorkflowToolsMarquee|visibilitychange|data-paused|userPaused|pageHidden/);
  assert.match(controls, /\[data-count-strip\]/);
  assert.match(controls, /\[data-count-value\]/);
  assert.match(controls, /duration = 1200/);
  assert.match(controls, /1 - Math\.pow\(1 - progress, 3\)/);
  assert.match(controls, /observer\.unobserve\(strip\)/);
  const navigation = await readFile(new URL("../app/components.tsx", import.meta.url), "utf8");
  assert.match(navigation, /export function WorkflowToolsMarquee/);
  assert.match(navigation, /aria-label=\{duplicate \? undefined : "Workflow tools"\}/);
  assert.match(navigation, /aria-hidden=\{duplicate \? "true" : undefined\}/);
  assert.doesNotMatch(navigation, /monochrome|tool-tile-monochrome/);
  assert.match(navigation, /href: "\/#about"/);
  assert.match(navigation, /href: "\/#selected-work"/);
  assert.match(navigation, /href: "\/#tools"/);
  assert.match(navigation, /href: "\/#contact"/);
  assert.match(navigation, /data-nav-section=\{item\.section\}/);
  assert.match(navigation, /<a key=\{item\.section\} href=\{item\.href\} data-section-link data-nav-section=\{item\.section\}>/);
  assert.match(navigation, /<a key=\{item\.section\} href=\{item\.href\} data-section-link>\{item\.label\}<\/a>/);
  assert.doesNotMatch(navigation, /href="\/work" aria-current|href="\/about" aria-current/);
  assert.match(navigation, /hamburger-icon/);
  assert.doesNotMatch(navigation, />Menu<\/summary>/);
});

test("theme initializes before paint and persists the selected preference", async () => {
  const [layout, controls] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/client-components.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /data-theme="dark"/);
  assert.match(layout, /localStorage\.getItem\('edsun-theme'\)/);
  assert.match(controls, /localStorage\.setItem\("edsun-theme"/);
  assert.match(controls, /aria-pressed/);
  assert.match(controls, /Switch to \$\{target\} theme/);
});

test("about and work pages expose the requested information architecture", async () => {
  const [aboutResponse, workResponse] = await Promise.all([render("/about"), render("/work")]);
  assert.equal(aboutResponse.status, 200);
  assert.equal(workResponse.status, 200);
  const [about, work] = await Promise.all([aboutResponse.text(), workResponse.text()]);
  assert.match(about, /Designer, editor, and[\s\S]*ready to help you communicate\./);
  assert.match(about, /My work starts with what your audience needs to understand\./);
  assert.match(about, /Experience across the formats your work may need\./);
  assert.match(about, /Start with what you need to say/);
  assert.match(about, /Share, review, and refine/);
  assert.match(about, /Unica Publications/);
  assert.match(about, /Bachelor of Science in Information Technology/);
  assert.match(about, /Philippines/);
  assert.match(about, /Worldwide remote/);
  assert.doesNotMatch(about, /1,000\+|Curious by nature|Seven years of practical creative work/);
  assert.doesNotMatch(about, /about-hero-photo|about-headshot\.jpg/);
  assert.doesNotMatch(about, /Available for select projects|Have something in mind\?/);
  assert.match(work, /Graphic Design/);
  assert.match(work, /Webinar Presentations/);
  assert.match(work, /Web Design/);
  assert.match(work, /Video Editing/);
  assert.doesNotMatch(work, /Web \/ Digital|motion-video-reel|short-form-social-edits/);
  assert.match(work, /Project index/);
  assert.match(work, /2023 to 2026/);
  assert.match(work, /See the work behind[\s\S]*the ideas\./);
  assert.match(work, /Explore campaigns, presentations, web pages, app concepts, print pieces, and tutorial videos built to make the next message easier to understand\./);
  assert.equal((work.match(/class="project-card reveal"/g) ?? []).length, 15);
  assert.equal((work.match(/class="project-card project-placeholder reveal"/g) ?? []).length, 0);
  assert.doesNotMatch(work, /Project coming soon\./);
  assert.equal((work.match(/class="work-group"/g) ?? []).length, 4);
  assert.equal((work.match(/>View Project(?:<!-- -->)?\s*<span aria-hidden="true">↗<\/span><\/a>/g) ?? []).length, 12);
  assert.equal((work.match(/>Watch Video(?:<!-- -->)?\s*<span aria-hidden="true">↗<\/span><\/a>/g) ?? []).length, 3);
  for (const [title, image, url] of [
    ["Smart Income Streams with AI Sales Page", "/images/web-001.jpg", "https://www.behance.net/gallery/238320549/Smart-Income-Streams-with-AI-Long-Form-Sales-Page"],
    ["Mastering Your Money Webinar", "/images/webinar-001.jpg", "https://www.behance.net/gallery/226745875/Mastering-Your-Money-Webinar-Template"],
    ["Mastering Digital Marketing Webinar", "/images/webinar-002.jpg", "https://www.behance.net/gallery/226721607/Mastering-Digital-Marketing-Webinar-Template"],
    ["Blue Theme Webinar Deck", "/images/webinar-003.jpg", "https://www.behance.net/gallery/238076371/Blue-Theme-Webinar-Google-Slides-Deck-Template"],
    ["Social Media Marketing Webinar", "/images/webinar-004.jpg", "https://www.behance.net/gallery/238031503/Social-Media-Marketing-Webinar-Google-Slides-Template"],
    ["Unlock Financial Freedom Webinar", "/images/webinar-005.jpg", "https://www.behance.net/gallery/226718265/Unlock-Financial-Freedom-Webinar-Template"],
  ]) {
    assert.match(work, new RegExp(escapeRegExp(title)));
    assert.match(work, new RegExp(`src="${escapeRegExp(image)}"`));
    assert.equal((work.match(new RegExp(`href="${escapeRegExp(url)}"`, "g")) ?? []).length, 3);
  }
  for (const [title, image, url] of [
    ["CapCut Export Settings for Crisp Video", "/images/video-001.webp", "https://www.dropbox.com/scl/fi/zwuvh531mcnep968p83qf/Module-9.1.mp4?rlkey=jlmao5nu6ve4ig41rs61p0jr4&dl=0"],
    ["Watermark-Free CapCut Exports", "/images/video-002.webp", "https://www.dropbox.com/scl/fi/r2zqv70yj2owfvkym04ad/Module-9.2.mp4?rlkey=lrdzkymohlmhp2gntwm6shk0i&dl=0"],
    ["CapCut Covers and Thumbnails", "/images/video-003.webp", "https://www.dropbox.com/scl/fi/431bcw042ojmnck7pawzs/Module-9.3.mp4?rlkey=wsmfkjw55y5d88dfwzoic3g08&dl=0"],
  ]) {
    assert.match(work, new RegExp(escapeRegExp(title)));
    assert.match(work, new RegExp(`src="${escapeRegExp(image)}"`));
    const renderedUrl = url.replaceAll("&", "&amp;");
    assert.equal((work.match(new RegExp(`href="${escapeRegExp(renderedUrl)}"`, "g")) ?? []).length, 3);
  }
  assert.doesNotMatch(work, /View case study/i);
  assert.match(work, /alt="Smart Income Streams with AI sales page shown on desktop, laptop, tablet, and mobile screens"/);
  assert.doesNotMatch(work, /Work made to|built with clarity, craft, and purpose/);
  assert.doesNotMatch(work, /Available for select projects|Have something in mind\?/);
});

test("project routes render direct case-study copy and navigation", async () => {
  const caseStudies = [
    ["ai-business-model-landing-page", "A sales page that keeps the next step clear.", "https://www.behance.net/gallery/238027647/AI-Business-Model-Landing-Page-Website-Design", "Smart Income Streams with AI Sales Page", "View project on Behance"],
    ["smart-income-streams-ai-sales-page", "A long offer visitors can follow.", "https://www.behance.net/gallery/238320549/Smart-Income-Streams-with-AI-Long-Form-Sales-Page", "Digital Marketing Mastery Campaign", "View project on Behance"],
    ["digital-marketing-campaign", "One campaign system, from webinar to feed.", "https://www.behance.net/gallery/226541053/Digital-Marketing-Mastery-Webinar-Social-Media-Design", "Wealth Webinar Slide System", "View project on Behance"],
    ["wealth-webinar-presentation", "A deck that keeps live lessons moving.", "https://www.behance.net/gallery/226690009/Wealth-Google-Slides-Webinar-Template", "Mastering Your Money Webinar", "View project on Behance"],
    ["mastering-your-money-webinar", "A friendlier way to teach financial decisions.", "https://www.behance.net/gallery/226745875/Mastering-Your-Money-Webinar-Template", "Mastering Digital Marketing Webinar", "View project on Behance"],
    ["mastering-digital-marketing-webinar", "A clearer way to teach a broad topic.", "https://www.behance.net/gallery/226721607/Mastering-Digital-Marketing-Webinar-Template", "Blue Theme Webinar Deck", "View project on Behance"],
    ["blue-theme-webinar-deck", "One reliable structure for different webinar topics.", "https://www.behance.net/gallery/238076371/Blue-Theme-Webinar-Google-Slides-Deck-Template", "Social Media Marketing Webinar", "View project on Behance"],
    ["social-media-marketing-webinar", "Visual energy with a clear teaching flow.", "https://www.behance.net/gallery/238031503/Social-Media-Marketing-Webinar-Google-Slides-Template", "Unlock Financial Freedom Webinar", "View project on Behance"],
    ["unlock-financial-freedom-webinar", "A clear order for complex financial lessons.", "https://www.behance.net/gallery/226718265/Unlock-Financial-Freedom-Webinar-Template", "Page Whisper Reading App", "View project on Behance"],
    ["page-whisper-mobile-app", "A simpler route from discovery to reading.", "https://www.behance.net/gallery/226752305/Page-Whisper-Mobile-App-UI", "Heart Health Made Simple", "View project on Behance"],
    ["heart-health-book-cover", "A cover that stays clear wherever readers see it.", "https://www.behance.net/gallery/226851791/Heart-Health-Book-Cover-Template", "Moonlight Car Rental Brochure", "View project on Behance"],
    ["moonlight-car-rental-brochure", "Important booking details, easy to scan.", "https://www.behance.net/gallery/176567239/Dynamic-Brochure-Design-for-Your-Car-Rental-Service", "CapCut Export Settings for Crisp Video", "View project on Behance"],
    ["capcut-export-settings", "A practical checklist for better exports.", "https://www.dropbox.com/scl/fi/zwuvh531mcnep968p83qf/Module-9.1.mp4?rlkey=jlmao5nu6ve4ig41rs61p0jr4&dl=0", "Watermark-Free CapCut Exports", "Watch on Dropbox"],
    ["watermark-free-capcut-exports", "A simpler path to clean exports.", "https://www.dropbox.com/scl/fi/r2zqv70yj2owfvkym04ad/Module-9.2.mp4?rlkey=lrdzkymohlmhp2gntwm6shk0i&dl=0", "CapCut Covers and Thumbnails", "Watch on Dropbox"],
    ["capcut-covers-and-thumbnails", "A repeatable thumbnail workflow.", "https://www.dropbox.com/scl/fi/431bcw042ojmnck7pawzs/Module-9.3.mp4?rlkey=wsmfkjw55y5d88dfwzoic3g08&dl=0", "AI Business Model Landing Page", "Watch on Dropbox"],
  ];

  for (const [slug, outcomeHeading, externalUrl, nextProject, actionLabel] of caseStudies) {
    const response = await render(`/work/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /All projects/);
    assert.match(html, /Challenge and approach/);
    assert.match(html, /Final work/);
    assert.match(html, /Outcome/);
    assert.match(html, new RegExp(escapeRegExp(outcomeHeading)));
    assert.match(html, /Next project/);
    assert.match(html, new RegExp(escapeRegExp(nextProject)));
    const renderedUrl = externalUrl.replaceAll("&", "&amp;");
    assert.match(html, new RegExp(`href="${escapeRegExp(renderedUrl)}"`));
    assert.match(html, new RegExp(escapeRegExp(actionLabel)));
    assert.doesNotMatch(html, /The brief|Selected outcome|Designed to stay clear at every size/);
  }

  for (const removedSlug of ["motion-video-reel", "short-form-social-edits"]) {
    const response = await render(`/work/${removedSlug}`);
    assert.equal(response.status, 404);
  }
});

test("user-facing copy avoids em dashes", async () => {
  const copyFiles = await Promise.all([
    "../app/page.tsx",
    "../app/about/page.tsx",
    "../app/work/page.tsx",
    "../app/work/[slug]/page.tsx",
    "../app/data.ts",
    "../app/layout.tsx",
    "../app/project-gallery.tsx",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  assert.doesNotMatch(copyFiles.join("\n"), /—/);
});

test("visitor-first copy keeps user-facing text free of em dash characters", async () => {
  const copyFiles = await Promise.all([
    "../app/page.tsx",
    "../app/about/page.tsx",
    "../app/work/page.tsx",
    "../app/work/[slug]/page.tsx",
    "../app/data.ts",
    "../app/layout.tsx",
    "../app/project-gallery.tsx",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")));
  assert.equal(copyFiles.join("\n").includes(String.fromCodePoint(0x2014)), false);
});

test("social metadata uses the incoming host and bespoke card", async () => {
  const [layout, home, about, work] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/work/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.match(layout, /summary_large_image/);
  assert.match(layout, /Explore graphic design, video editing, presentation design, and web work that helps messages land clearly\./);
  assert.match(home, /Explore graphic design, video editing, presentation design, and web work that helps messages land clearly\./);
  assert.match(about, /Learn how Edsun Caldoza turns ideas into clear print, presentation, web, and digital work/);
  assert.match(work, /Explore graphic design, webinar presentations, web design, and video editing projects by Edsun Caldoza\./);
});

test("brand favicon is exposed with compatible fallbacks", async () => {
  const [layout, favicon, fallback, ico] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/favicon.png", import.meta.url)),
    readFile(new URL("../public/images/ico.png", import.meta.url)),
    readFile(new URL("../public/favicon.ico", import.meta.url)),
  ]);
  assert.match(layout, /url: "\/favicon\.ico\?v=4", type: "image\/x-icon", sizes: "150x150"/);
  assert.match(layout, /url: "\/favicon\.png\?v=4", type: "image\/png", sizes: "150x150"/);
  assert.match(layout, /shortcut: "\/favicon\.ico\?v=4"/);
  assert.match(layout, /apple: \{ url: "\/favicon\.png\?v=4", type: "image\/png", sizes: "150x150" \}/);
  assert.equal(favicon.equals(fallback), true);
  assert.equal(favicon.readUInt32BE(0), 0x89504e47);
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 1);
  assert.equal(ico.subarray(22).equals(favicon), true);
});
