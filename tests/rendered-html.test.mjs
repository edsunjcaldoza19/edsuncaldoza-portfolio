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

test("home clearly positions Edsun and exposes recruiter and client paths", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Graphic Designer/);
  assert.match(html, /Video Editor/);
  assert.match(html, /View selected work/);
  assert.match(html, /Let(?:&apos;|&#x27;|'|’)s work together/);
  assert.match(html, /href="\/resume\.pdf"/);
  assert.match(html, /edsunjcaldoza@gmail\.com/);
  assert.match(html, /class="hero-pattern"/);
  assert.match(html, /class="hero-pattern" aria-hidden="true"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Alex Morgan/);
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /\.hero-pattern/);
  assert.match(css, /-webkit-mask-image/);
  assert.match(css, /background-size:\s*32px 32px/);
  assert.doesNotMatch(css, /radial-gradient\(circle at 7px 7px/);
  assert.doesNotMatch(css, /\.hero-shell::after/);
});

test("about and work pages expose the requested information architecture", async () => {
  const [aboutResponse, workResponse] = await Promise.all([render("/about"), render("/work")]);
  assert.equal(aboutResponse.status, 200);
  assert.equal(workResponse.status, 200);
  const [about, work] = await Promise.all([aboutResponse.text(), workResponse.text()]);
  assert.match(about, /Seven years of/);
  assert.match(about, /Unica Publications/);
  assert.match(about, /Bachelor of Science in Information Technology/);
  assert.match(work, /Video Editing/);
  assert.match(work, /Graphic Design/);
  assert.match(work, /Web \/ Digital/);
  assert.match(work, /motion-video-reel/);
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
