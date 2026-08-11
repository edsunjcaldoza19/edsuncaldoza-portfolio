import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navigation, ProjectCard, SectionIntro } from "./components";
import { featuredProjects } from "./data";

export const metadata: Metadata = {
  title: "Edsun Caldoza — Graphic Designer & Video Editor",
  description: "Graphic design, video editing, and digital experiences built with clarity, craft, and purpose.",
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <section className="hero-shell">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="hero">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> Based in the Philippines · Working worldwide</p>
              <h1>Graphic Designer<br />&amp; Video Editor.</h1>
              <p className="hero-intro">I turn ideas into clear, memorable visuals—from campaign systems and presentations to social edits and digital experiences.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#selected-work">View selected work</a>
                <a className="button button-secondary" href="mailto:edsunjcaldoza@gmail.com">Let’s work together</a>
              </div>
              <a className="resume-link" href="/resume.pdf" target="_blank" rel="noreferrer">View résumé <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-art">
              <div className="portrait-frame"><img src="/images/hero-headshot.jpg" alt="Portrait of Edsun Caldoza" /></div>
              <div className="hero-note"><span>Currently available</span><strong>Freelance · Remote roles</strong></div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Selected career highlights">
          <div><strong>1,000+</strong><span>Cover templates designed</span></div>
          <div><strong>50+</strong><span>Webinar presentations</span></div>
          <div><strong>7+ years</strong><span>Professional experience</span></div>
          <div><strong>Global</strong><span>Remote collaboration</span></div>
        </section>

        <section className="selected-work" id="selected-work">
          <SectionIntro number="01" label="Selected work" title="A focused selection of recent projects." />
          <div className="project-grid">
            {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
          <Link className="section-link" href="/work">Explore all projects <span aria-hidden="true">→</span></Link>
        </section>

        <section className="reel-wrap">
          <div className="reel-section">
            <div className="reel-copy">
              <p className="section-label light"><span>02</span>Video &amp; motion</p>
              <h2>Editing with intention.</h2>
              <p>Built around the hook, the rhythm, and the reason someone should keep watching.</p>
              <Link className="button button-on-dark" href="/work/motion-video-reel">View reel case study</Link>
            </div>
            <div className="reel-player">
              <video controls muted playsInline preload="metadata" poster="/images/project-2.jpg">
                <source src="/videos/edsun-reel.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
              <span className="reel-caption">Portfolio reel · 00:20</span>
            </div>
          </div>
        </section>

        <section className="services">
          <SectionIntro number="03" label="Services" title="Focused creative services, built to flex." />
          <div className="service-list">
            <article><span>01</span><h3>Graphic Design</h3><p>Campaign systems, presentation design, social content, book covers, and print-ready collateral.</p><strong>Visual identity · Layout · Marketing</strong></article>
            <article><span>02</span><h3>Video Editing</h3><p>Short-form social edits, promotional videos, branded titles, captions, and selected long-form content.</p><strong>Pacing · Story · Motion</strong></article>
            <article><span>03</span><h3>Web &amp; Digital</h3><p>Landing pages, responsive visual systems, and interface concepts that keep the message and action clear.</p><strong>WordPress · UI/UX · Conversion</strong></article>
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="skills-heading">
            <p className="section-label"><span>04</span>Capabilities</p>
            <h2>Skills and tools that support the work.</h2>
          </div>
          <div className="skill-groups">
            <article><h3>Graphic design</h3><p>Campaign direction · Social graphics · Presentation systems · Book covers · Print production · Image retouching</p><small>Photoshop · Canva · Google Slides</small></article>
            <article><h3>Video editing</h3><p>Short-form editing · Promotional cuts · Pacing &amp; story · Captions · Titles · Visual transitions</p><small>Editing workflow · Motion graphics · Sound polish</small></article>
            <article><h3>Web &amp; digital</h3><p>Landing pages · Responsive design · Wireframes · UI systems · Content hierarchy · Conversion thinking</p><small>Figma · WordPress · HTML · CSS</small></article>
            <article><h3>Collaboration</h3><p>Creative briefing · Client communication · Feedback rounds · Remote teamwork · Deadline ownership</p><small>Clear process · Detail focused · Reliable delivery</small></article>
          </div>
        </section>

        <section className="about-teaser">
          <div className="about-photo"><img src="/images/about-headshot.jpg" alt="Edsun Caldoza in professional attire" loading="lazy" /></div>
          <div className="about-copy">
            <p className="section-label"><span>05</span>About</p>
            <h2>Designing with clarity, care, and practical experience.</h2>
            <p>I’m Edsun—a multidisciplinary designer with roots in print production, digital design, and teaching. That mix made me creatively ambitious and unusually attentive to the details that make work usable.</p>
            <Link className="text-link" href="/about">More about me <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="testimonial">
          <p className="eyebrow">Client feedback</p>
          <blockquote>“Such a great experience working with Edsun. He never hesitated to provide a revision, no matter how small the detail. I would love to work with him again.”</blockquote>
          <div className="quote-person"><img src="/images/testimonial-1.jpg" alt="William Meyer" loading="lazy" /><div><strong>William Meyer</strong><span>Client · United States</span></div></div>
        </section>

        <section className="contact" id="contact">
          <div>
            <p className="eyebrow light">Start a conversation</p>
            <h2>Let’s create something clear and memorable.</h2>
            <p>Available for freelance projects, remote roles, and creative collaborations.</p>
          </div>
          <a className="contact-email" href="mailto:edsunjcaldoza@gmail.com">Email Edsun <span aria-hidden="true">→</span></a>
        </section>
      </main>
      <Footer />
    </>
  );
}
