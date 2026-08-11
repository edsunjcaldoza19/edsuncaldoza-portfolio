import type { Metadata } from "next";
import Link from "next/link";
import { RotatingRole } from "./client-components";
import { Footer, Navigation, ProjectCard, SectionIntro } from "./components";
import { featuredProjects } from "./data";

export const metadata: Metadata = {
  title: "Edsun Caldoza — Graphic Designer & Video Editor",
  description: "Graphic design, video editing, and digital experiences built with clarity, craft, and purpose.",
};

const expertise = [
  { number: "01", title: "Graphic Design", text: "Campaign systems, presentations, social content, publishing, and print-ready collateral.", tools: "Photoshop · Canva · Google Slides" },
  { number: "02", title: "Video Editing", text: "Short-form social, promotional cuts, branded titles, captions, rhythm, and visual transitions.", tools: "Editing · Motion graphics · Sound polish" },
  { number: "03", title: "Web & Digital", text: "Landing pages, responsive visual systems, and interfaces that keep the action clear.", tools: "Figma · WordPress · HTML · CSS" },
];

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <section className="hero-shell">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="hero">
            <div className="hero-copy">
              <RotatingRole />
              <h1 className="hero-pitch">I build Visual Experiences that <span className="hero-gradient-word">Connect</span> and <span className="hero-gradient-word">Convert</span>.</h1>
              <div className="hero-actions-wrap">
                <div className="hero-actions">
                  <a className="button button-primary" href="#selected-work">View selected work</a>
                  <a className="button button-secondary" href="mailto:edsunjcaldoza@gmail.com">Let’s work together</a>
                </div>
                <a className="resume-link" href="/resume.pdf" target="_blank" rel="noreferrer">View résumé <span aria-hidden="true">↗</span></a>
              </div>
              <div className="hero-status"><span className="status-dot" /> Available for freelance &amp; remote roles</div>
            </div>
            <figure className="hero-portrait">
              <img src="/images/hero-portrait-black-shirt.png" width="1121" height="1403" alt="Portrait of Edsun Caldoza wearing a black shirt" fetchPriority="high" />
            </figure>
          </div>
        </section>

        <section className="proof-strip reveal" aria-label="Selected career highlights">
          <div><strong>1,000+</strong><span>Cover templates designed</span></div>
          <div><strong>50+</strong><span>Webinar presentations</span></div>
          <div><strong>7+ years</strong><span>Professional creative work</span></div>
          <div><strong>Worldwide</strong><span>Remote collaboration</span></div>
        </section>

        <section className="home-about" id="skills">
          <SectionIntro number="01" label="About & expertise" title={<>Ideas made visible.<br />Stories made memorable.</>} />
          <div className="about-expertise-grid">
            <div className="about-expertise-copy reveal">
              <p className="about-lead">I’m Edsun, a multidisciplinary designer with roots in print production, digital design, and teaching.</p>
              <p>That mix helps me connect creative ambition with the practical details that make work clear, adaptable, and ready to deliver.</p>
              <Link className="text-link" href="/about">More about me <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="expertise-list reveal">
              {expertise.map((item) => (
                <article key={item.title}>
                  <span>{item.number}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p><small>{item.tools}</small></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="selected-work" id="selected-work">
          <SectionIntro number="02" label="Selected work" title={<>Six projects.<br />One clear point of view.</>} />
          <div className="project-grid">
            {featuredProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </div>
          <Link className="section-link" href="/work">Explore all projects <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="testimonial reveal">
          <p className="section-label"><span>03</span>Client feedback</p>
          <blockquote>“Such a great experience working with Edsun. He never hesitated to provide a revision, no matter how small the detail. I would love to work with him again.”</blockquote>
          <div className="quote-person"><img src="/images/testimonial-1.jpg" alt="William Meyer" loading="lazy" /><div><strong>William Meyer</strong><span>Client · United States</span></div></div>
        </section>

        <section className="contact-close reveal" id="contact">
          <div className="contact-topline"><p className="section-label"><span>04</span>Contact</p><span>Based in the Philippines · Working worldwide</span></div>
          <h2>Let’s build<br /><span>something.</span></h2>
          <div className="contact-bottom">
            <p>Available for freelance projects, remote roles, and thoughtful creative collaborations.</p>
            <a className="contact-email" href="mailto:edsunjcaldoza@gmail.com">Email Edsun <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
