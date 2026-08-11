import assert from "node:assert/strict";
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

test("home presents the role-focused hero and recruiter/client paths", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Hi, I(?:&apos;|&#x27;|’)m Edsun -/);
  assert.match(html, /I build Visuals[\s\S]*that/);
  assert.doesNotMatch(html, /Visual Experiences/);
  assert.match(html, /class="hero-gradient-word">Connect<\/span> and <span class="hero-gradient-word">Convert<\/span>\./);
  assert.match(html, /Hi, I(?:&apos;|&#x27;|’)m Edsun\. A Designer, Video Editor, and Creator\./);
  assert.match(html, /class="hero-title-break"/);
  assert.equal((html.match(/class="role-track-item"/g) ?? []).length, 4);
  assert.match(html, /hero-portrait-black-shirt\.png/);
  assert.match(html, /fetchPriority="high"|fetchpriority="high"/i);
  assert.match(html, /View selected work/);
  assert.match(html, /work together/);
  assert.match(html, /href="\/resume\.pdf"/);
  assert.match(html, /edsunjcaldoza@gmail\.com/);
  assert.match(html, /class="hero-pattern" aria-hidden="true"/);
  assert.match(html, /About &amp; expertise/);
  assert.match(html, /Client feedback/);
  assert.match(html, /build/);
  assert.match(html, /aria-label="Switch to light theme"/);
  assert.match(html, /role="progressbar"/);
  assert.match(html, /aria-label="Page scroll progress"/);
  assert.match(html, /aria-valuenow="0"/);
  assert.match(html, /aria-label="Toggle navigation menu"/);
  assert.match(html, /data-scrolled="false"/);
  assert.doesNotMatch(html, /<h1[^>]*>Designing/);
  assert.doesNotMatch(html, /I turn ideas into clear, memorable visuals/);
  assert.doesNotMatch(html, /class="about-portrait/);
  assert.doesNotMatch(html, /Available for select projects|Have something in mind\?|Start a conversation|footer-lead|footer-cta/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Alex Morgan/);
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.hero-pattern/);
  assert.match(css, /-webkit-mask-image/);
  assert.match(css, /background-size:\s*32px 32px/);
  assert.match(css, /html\[data-theme="light"\]/);
  assert.match(css, /html\[data-motion="ready"\] \.reveal/);
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
  assert.match(css, /\.role-viewport[^}]*width:\s*13ch[^}]*height:\s*1em[^}]*overflow:\s*hidden/s);
  assert.match(css, /@keyframes role-scroll-up/);
  assert.match(css, /animation:\s*role-scroll-up 9s/);
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
  assert.match(css, /\.role-heading-visual[^}]*flex-wrap:\s*nowrap/s);
  assert.match(css, /\.role-viewport[^}]*flex:\s*0 0 13ch/s);
  assert.match(css, /\.hero-gradient-word/);
  assert.match(css, /background-clip:\s*text/);
  assert.match(css, /hero-gradient-shift 6s ease-in-out infinite alternate/);
  assert.match(css, /\.hero-gradient-word \{ animation:\s*none !important;/);
  assert.doesNotMatch(css, /\.hero-intro/);
  assert.match(css, /\.section-intro \{ margin-bottom:\s*72px; display:\s*block; \}/);
  assert.match(css, /\.section-intro \.section-label \{ margin-bottom:\s*24px; \}/);
  assert.doesNotMatch(css, /\.section-intro[^}]*grid-template-columns:\s*220px 1fr/s);
});

test("navigation and rotating roles use the specified accessible behavior", async () => {
  const controls = await readFile(new URL("../app/client-components.tsx", import.meta.url), "utf8");
  assert.match(controls, /\["A Designer\.", "Video Editor\.", "Creator\."\]/);
  assert.doesNotMatch(controls, /"Graphic Designer"|"Web Designer"/);
  assert.match(controls, /window\.scrollY > 32/);
  assert.match(controls, /requestAnimationFrame/);
  assert.match(controls, /passive: true/);
  assert.match(controls, /scrollHeight - window\.innerHeight/);
  assert.match(controls, /Math\.min\(1, Math\.max\(0, ratio\)\)/);
  assert.match(controls, /--scroll-progress/);
  assert.match(controls, /aria-valuenow/);
  assert.match(controls, /ResizeObserver/);
  assert.match(controls, /prefers-reduced-motion: reduce/);
  assert.match(controls, /aria-hidden="true"/);
  assert.doesNotMatch(controls, /aria-live/);
  assert.match(controls, /\.\.\.portfolioRoles, portfolioRoles\[0\]/);
  assert.doesNotMatch(controls, /characterIndex|deleting|typing-cursor|setTimeout/);
  const navigation = await readFile(new URL("../app/components.tsx", import.meta.url), "utf8");
  assert.match(navigation, /aria-current=\{active === "work" \? "page"/);
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
  assert.match(about, /Seven years of/);
  assert.match(about, /Unica Publications/);
  assert.match(about, /Bachelor of Science in Information Technology/);
  assert.match(about, /Philippines/);
  assert.match(about, /Worldwide remote/);
  assert.doesNotMatch(about, /about-hero-photo|about-headshot\.jpg/);
  assert.doesNotMatch(about, /Available for select projects|Have something in mind\?|Start a conversation/);
  assert.match(work, /Video Editing/);
  assert.match(work, /Graphic Design/);
  assert.match(work, /Web \/ Digital/);
  assert.match(work, /motion-video-reel/);
  assert.match(work, /Project index/);
  assert.doesNotMatch(work, /Available for select projects|Have something in mind\?|Start a conversation/);
});

test("project routes render internal case-study content and navigation", async () => {
  const response = await render("/work/digital-marketing-campaign");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Digital Marketing Mastery/);
  assert.match(html, /The brief/);
  assert.match(html, /Outcome/);
  assert.match(html, /Next project/);
  assert.match(html, /View full project on Behance/);
});

test("social metadata uses the incoming host and bespoke card", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /new URL\("\/og\.png", metadataBase\)/);
  assert.match(layout, /summary_large_image/);
  assert.match(layout, /Edsun Caldoza/);
});
