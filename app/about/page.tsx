import type { Metadata } from "next";
import { PageShell } from "../components";

export const metadata: Metadata = {
  title: "About — Edsun Caldoza",
  description: "Meet Edsun Caldoza, a graphic designer and video editor with a background in digital design, print production, and teaching.",
};

const experience = [
  { date: "2023 — Present", role: "Web & Graphic Designer", company: "Unica Publications · Remote", detail: "Designing landing pages, campaign assets, 1,000+ book cover templates, product mockups, YouTube thumbnails, and 50+ webinar presentations for an international team." },
  { date: "2022 — 2023", role: "IT Instructor", company: "Asian Development Foundation College", detail: "Taught Adobe Photoshop, Figma, interactive prototyping, and practical web-development fundamentals through hands-on creative work." },
  { date: "2018 — 2022", role: "Graphic Designer", company: "Oliver’s ArtZyd", detail: "Created print-ready layouts for apparel, mugs, invitations, brochures, and other custom products while managing briefs, revisions, and production deadlines." },
];

export default function AboutPage() {
  return (
    <PageShell active="about">
      <main className="inner-page" id="main-content">
        <section className="about-hero">
          <div className="about-hero-copy reveal">
            <p className="eyebrow">About Edsun · 01</p>
            <h1>Curious by nature.<br /><span>Precise by practice.</span></h1>
            <p>I’m a graphic designer and video editor who brings together creative direction, technical detail, and practical production experience.</p>
          </div>
          <div className="about-facts reveal" aria-label="Professional overview">
            <div><span>Based in</span><strong>Philippines</strong></div>
            <div><span>Experience</span><strong>7+ years</strong></div>
            <div><span>Availability</span><strong>Worldwide remote</strong></div>
          </div>
        </section>

        <section className="about-story reveal">
          <p className="section-label"><span>02</span>My story</p>
          <div><h2>I make ideas easier to see, understand, and remember.</h2><p>My path began in print production, where every detail had to survive the move from screen to finished object. I carried that discipline into digital campaigns, landing pages, presentations, and motion-led content.</p><p>Teaching design and technology sharpened another part of my process: explaining choices clearly. Whether I’m collaborating with a client or a remote team, I aim to make feedback straightforward and the final work purposeful.</p></div>
        </section>

        <section className="experience-section reveal">
          <div className="experience-head"><p className="section-label"><span>03</span>Experience</p><h2>Seven years of practical creative work.</h2><a className="button button-primary" href="/resume.pdf" target="_blank" rel="noreferrer">Download résumé</a></div>
          <div className="timeline">
            {experience.map((item) => <article key={item.role}><time>{item.date}</time><div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.detail}</p></div></article>)}
          </div>
        </section>

        <section className="principles reveal">
          <p className="section-label"><span>04</span>How I work</p>
          <div className="principle-grid">
            <article><span>01</span><h3>Start with the message</h3><p>Before style, I clarify what the audience needs to understand, feel, and do.</p></article>
            <article><span>02</span><h3>Build a visual system</h3><p>I create rules that make the work consistent, adaptable, and easier to extend.</p></article>
            <article><span>03</span><h3>Refine with purpose</h3><p>Feedback becomes focused iteration—not decoration for decoration’s sake.</p></article>
          </div>
        </section>

        <section className="education reveal">
          <p className="section-label"><span>05</span>Education</p>
          <div><article><h3>Bachelor of Science in Information Technology</h3><p>Leyte Normal University · 2018—2022</p><strong>Competence in Practicum Awardee</strong></article><article><h3>Information &amp; Communication Technology</h3><p>Holy Trinity College · 2016—2018</p><strong>High Honors · CSS NC II Certificate</strong></article></div>
        </section>
      </main>
    </PageShell>
  );
}
