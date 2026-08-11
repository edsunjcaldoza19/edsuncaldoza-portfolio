import type { Metadata } from "next";
import { PageShell } from "../components";

export const metadata: Metadata = {
  title: "About | Edsun Caldoza",
  description: "About Edsun Caldoza, a graphic designer and video editor with experience in print, presentations, web design, and digital content.",
};

const experience = [
  { date: "2023 to Present", role: "Web & Graphic Designer", company: "Unica Publications · Remote", detail: "I design landing pages and digital assets for an international remote team. My work includes book covers, product mockups, YouTube thumbnails, and webinar presentations." },
  { date: "2022 to 2023", role: "IT Instructor", company: "Asian Development Foundation College", detail: "I taught Photoshop, Figma, interactive prototyping, PHP, and web development through practical lessons and hands-on projects." },
  { date: "2018 to 2022", role: "Graphic Designer", company: "Oliver’s ArtZyd", detail: "I created print-ready designs for apparel, mugs, invitations, brochures, and other custom products. I also managed client briefs, revisions, and production deadlines." },
];

export default function AboutPage() {
  return (
    <PageShell active="about">
      <main className="inner-page" id="main-content">
        <section className="about-hero">
          <div className="about-hero-copy reveal">
            <p className="eyebrow">About Edsun · 01</p>
            <h1>Designer, editor, and<br /><span>practical problem-solver.</span></h1>
            <p>I’m a graphic designer and video editor based in the Philippines. I create campaign assets, presentations, web pages, print materials, and digital content for clients and remote teams.</p>
          </div>
          <div className="about-facts reveal" aria-label="Professional overview">
            <div><span>Based in</span><strong>Philippines</strong></div>
            <div><span>Experience</span><strong>7+ years</strong></div>
            <div><span>Availability</span><strong>Worldwide remote</strong></div>
          </div>
        </section>

        <section className="about-story reveal">
          <p className="section-label"><span>02</span>Background</p>
          <div><h2>I learned design by making work that had to function in the real world.</h2><p>I started in print production, designing shirts, mugs, invitations, brochures, and other custom materials. That experience taught me to pay attention to size, color, deadlines, and the details that separate a good file from a finished product.</p><p>Since then, I’ve worked on landing pages, book covers, webinar presentations, campaign graphics, and video content. Teaching Photoshop, Figma, PHP, and web development also made me better at explaining decisions and working through feedback.</p></div>
        </section>

        <section className="experience-section reveal">
          <div className="experience-head"><p className="section-label"><span>03</span>Experience</p><h2>Experience across print, digital, and education.</h2><a className="button button-primary" href="/resume.pdf" target="_blank" rel="noreferrer">Download résumé</a></div>
          <div className="timeline">
            {experience.map((item) => <article key={item.role}><time>{item.date}</time><div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.detail}</p></div></article>)}
          </div>
        </section>

        <section className="principles reveal">
          <p className="section-label"><span>04</span>How I work</p>
          <div className="principle-grid">
            <article><span>01</span><h3>Understand the goal</h3><p>I start with the audience, the message, and what the final piece needs to do.</p></article>
            <article><span>02</span><h3>Build a clear system</h3><p>I set the hierarchy, layout, type, color, and motion rules before refining the details.</p></article>
            <article><span>03</span><h3>Share and refine</h3><p>I explain decisions, listen to feedback, and make revisions that improve the work.</p></article>
          </div>
        </section>

        <section className="education reveal">
          <p className="section-label"><span>05</span>Education</p>
          <div><article><h3>Bachelor of Science in Information Technology</h3><p>Leyte Normal University · 2018 to 2022</p><strong>Competence in Practicum Awardee</strong></article><article><h3>Information &amp; Communication Technology</h3><p>Holy Trinity College · 2016 to 2018</p><strong>High Honors · CSS NC II Certificate</strong></article></div>
        </section>
      </main>
    </PageShell>
  );
}
