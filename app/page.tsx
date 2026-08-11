import type { Metadata } from "next";
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
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Based in the Philippines · Working worldwide</p>
            <h1>Graphic Designer<br />&amp; Video <em>Editor.</em></h1>
            <p className="hero-intro">I turn ideas into clear, memorable visuals—from campaign systems and presentations to social edits and digital experiences.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#selected-work">View selected work <span>↓</span></a>
              <a className="button button-line" href="mailto:edsunjcaldoza@gmail.com">Let&apos;s work together <span>↗</span></a>
              <a className="resume-link" href="/resume.pdf" target="_blank" rel="noreferrer">View résumé ↗</a>
            </div>
          </div>
          <div className="hero-art" aria-label="Portrait of Edsun Caldoza surrounded by selected creative disciplines">
            <div className="hero-grid" />
            <div className="portrait-frame">
              <img src="/images/hero-headshot.jpg" alt="Edsun Caldoza" />
            </div>
            <span className="art-tag tag-one">Campaigns</span>
            <span className="art-tag tag-two">Video edits</span>
            <span className="art-tag tag-three">Digital</span>
            <span className="spin-note">IDEA · FRAME · EDIT · DELIVER ·</span>
          </div>
        </section>

        <section className="proof-strip" aria-label="Selected career highlights">
          <div><strong>1,000+</strong><span>Cover templates designed</span></div>
          <div><strong>50+</strong><span>Webinar presentations</span></div>
          <div><strong>7+</strong><span>Years creating</span></div>
          <div><strong>Worldwide</strong><span>Remote collaboration</span></div>
        </section>

        <section className="selected-work" id="selected-work">
          <SectionIntro number="01" label="Selected work" title={<>Work that makes the<br /><em>message move.</em></>} />
          <div className="project-grid">
            {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
          <a className="wide-link" href="/work"><span>Explore the full archive</span><span>All projects ↗</span></a>
        </section>

        <section className="reel-section">
          <div className="reel-copy">
            <p className="section-label light"><span>02</span>Moving image</p>
            <h2>Design with<br /><em>a pulse.</em></h2>
            <p>Editing built around the hook, the rhythm, and the reason someone should keep watching.</p>
            <a className="button button-light" href="/work/motion-video-reel">View reel case study <span>↗</span></a>
          </div>
          <div className="reel-player">
            <video controls muted playsInline preload="metadata" poster="/images/project-2.jpg">
              <source src="/videos/edsun-reel.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
            <span className="reel-caption">PORTFOLIO REEL / 00:20</span>
          </div>
        </section>

        <section className="services">
          <SectionIntro number="03" label="What I do" title={<>A focused practice,<br /><em>built to flex.</em></>} />
          <div className="service-list">
            <article><span>01</span><h3>Graphic Design</h3><p>Campaign systems, presentation design, social content, book covers, and print-ready collateral.</p><strong>Visual identity · Layout · Marketing</strong></article>
            <article><span>02</span><h3>Video Editing</h3><p>Short-form social edits, promotional videos, branded titles, captions, and selected long-form content.</p><strong>Pacing · Story · Motion</strong></article>
            <article><span>03</span><h3>Web &amp; Digital</h3><p>Landing pages, responsive visual systems, and interface concepts that keep the message and action clear.</p><strong>WordPress · UI/UX · Conversion</strong></article>
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="skills-heading">
            <p className="section-label"><span>04</span>Capabilities</p>
            <h2>The craft behind<br /><em>the work.</em></h2>
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
            <p className="section-label light"><span>05</span>A little about me</p>
            <blockquote>“Good design should look sharp, work hard, and make the next step feel obvious.”</blockquote>
            <p>I&apos;m Edsun—a multidisciplinary designer with roots in print production, digital design, and teaching. That mix made me both creatively ambitious and unusually attentive to the details that make work usable.</p>
            <a className="button button-light" href="/about">More about me <span>↗</span></a>
          </div>
        </section>

        <section className="testimonial">
          <p className="quote-mark">“</p>
          <blockquote>Such a great experience working with Edsun! He never hesitated to provide a revision, no matter how small the detail. I would love to work with him again.</blockquote>
          <div className="quote-person"><img src="/images/testimonial-1.jpg" alt="William Meyer" loading="lazy" /><div><strong>William Meyer</strong><span>Client · United States</span></div></div>
        </section>

        <section className="contact" id="contact">
          <p className="section-label"><span>06</span>Start a conversation</p>
          <div><h2>Need a designer<br />who can <em>move?</em></h2><p>Available for freelance projects, remote roles, and creative collaborations.</p></div>
          <a className="contact-email" href="mailto:edsunjcaldoza@gmail.com">edsunjcaldoza@gmail.com <span>↗</span></a>
        </section>
      </main>
      <Footer />
    </>
  );
}
