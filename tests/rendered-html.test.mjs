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
  assert.match(html, /Hi, I(?:&apos;|&#x27;|’)m Edsun\./);
  assert.match(html, /Graphic Designer, Web Designer, and Video Editor/);
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
  assert.match(html, /data-scrolled="false"/);
  assert.doesNotMatch(html, /<h1[^>]*>Designing/);
  assert.doesNotMatch(html, /class="about-portrait/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Alex Morgan/);
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.hero-pattern/);
  assert.match(css, /-webkit-mask-image/);
  assert.match(css, /background-size:\s*32px 32px/);
  assert.match(css, /html\[data-theme="light"\]/);
  assert.match(css, /html\[data-motion="ready"\] \.reveal/);
  assert.match(css, /\.site-header\[data-scrolled="true"\]/);
  assert.match(css, /filter:\s*grayscale\(1\)\s+contrast\(1\.06\)/);
  assert.match(css, /\.typing-cursor/);
});

test("navigation and rotating roles use the specified accessible behavior", async () => {
  const controls = await readFile(new URL("../app/client-components.tsx", import.meta.url), "utf8");
  assert.match(controls, /\["Graphic Designer", "Web Designer", "Video Editor"\]/);
  assert.match(controls, /window\.scrollY > 32/);
  assert.match(controls, /requestAnimationFrame/);
  assert.match(controls, /passive: true/);
  assert.match(controls, /3000 - typeDuration - deleteDuration/);
  assert.match(controls, /prefers-reduced-motion: reduce/);
  assert.match(controls, /aria-hidden="true"/);
  assert.doesNotMatch(controls, /aria-live/);
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
  assert.match(work, /Video Editing/);
  assert.match(work, /Graphic Design/);
  assert.match(work, /Web \/ Digital/);
  assert.match(work, /motion-video-reel/);
  assert.match(work, /Project index/);
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
