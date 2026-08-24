import type { Metadata } from "next";
import { PageShell } from "../components";

export const metadata: Metadata = {
  title: "About | Edsun Caldoza",
  description: "Learn how Edsun Caldoza works with clients and remote teams to turn ideas into clear visual content.",
};

const experience = [
  { date: "2023 to Present", role: "Web & Graphic Designer", company: "Unica Publications · Remote", detail: "I design landing pages and digital assets that help a remote team explain offers across book covers, product mockups, YouTube thumbnails, and webinar presentations." },
  { date: "2022 to 2023", role: "IT Instructor", company: "Asian Development Foundation College", detail: "I taught Photoshop, Figma, interactive prototyping, PHP, and web development through practical lessons and hands-on projects." },
  { date: "2018 to 2022", role: "Graphic Designer", company: "Oliver’s ArtZyd", detail: "I created print-ready designs for apparel, mugs, invitations, brochures, and custom products while managing client briefs, revisions, and production deadlines." },
];

export default function AboutPage() {
  return (
    <PageShell active="about">
      <main className="inner-page" id="main-content">
        <section className="about-hero">
          <div className="about-hero-copy reveal" data-stagger>
            <p className="eyebrow">About Edsun · 01</p>
            <h1>Here’s how I turn ideas<br /><span>into clear visual work.</span></h1>
            <p>I’m a graphic designer and video editor based in the Philippines. I help clients and remote teams create campaign assets, presentations, websites, print materials, and video content that people can understand and use.</p>
          </div>
          <div className="about-facts reveal" aria-label="Professional overview">
            <div><span>Based in</span><strong>Philippines</strong></div>
            <div><span>Experience</span><strong>7+ years</strong></div>
            <div><span>Availability</span><strong>Worldwide remote</strong></div>
          </div>
        </section>

        <section className="about-story reveal" data-stagger>
          <p className="section-label"><span>02</span>Background</p>
          <div><h2>Good design starts with knowing what people need to understand.</h2><p>I started in print production, designing shirts, mugs, invitations, brochures, and other custom materials. That experience still shapes how I work for you: I consider size, color, deadlines, and the details that turn a good file into a finished product.</p><p>Since then, I’ve created landing pages, book covers, webinar presentations, campaign graphics, and video content. Teaching Photoshop, Figma, PHP, and web development also made me better at explaining decisions and working through feedback.</p></div>
        </section>

        <section className="experience-section reveal" data-stagger>
          <div className="experience-head"><p className="section-label"><span>03</span>Experience</p><h2>The experience I bring to your project.</h2><a className="button button-primary" href="/resume.pdf" target="_blank" rel="noreferrer">View my résumé</a></div>
          <div className="timeline reveal" data-stagger>
            {experience.map((item) => <article key={item.role}><time>{item.date}</time><div><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.detail}</p></div></article>)}
          </div>
        </section>

        <section className="principles reveal" data-stagger>
          <p className="section-label"><span>04</span>What working together looks like</p>
          <div className="principle-grid reveal" data-stagger>
            <article><span>01</span><h3>Tell me what you need to communicate</h3><p>We begin with your audience, message, and the action you want the final piece to support.</p></article>
            <article><span>02</span><h3>I build the visual direction</h3><p>I set the hierarchy, layout, type, color, and motion rules so the work has a clear direction.</p></article>
            <article><span>03</span><h3>We review and refine</h3><p>I explain the choices, listen to your feedback, and make revisions that improve the final work.</p></article>
          </div>
        </section>

        <section className="education reveal" data-stagger>
          <p className="section-label"><span>05</span>Education</p>
          <div><article><h3>Bachelor of Science in Information Technology</h3><p>Leyte Normal University · 2018 to 2022</p><strong>Competence in Practicum Awardee</strong></article><article><h3>Information &amp; Communication Technology</h3><p>Holy Trinity College · 2016 to 2018</p><strong>High Honors · CSS NC II Certificate</strong></article></div>
        </section>
      </main>
    </PageShell>
  );
}
