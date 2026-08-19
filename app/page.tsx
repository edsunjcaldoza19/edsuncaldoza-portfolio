import type { Metadata } from "next";
import { HeroGridHighlight, RotatingRole } from "./client-components";
import { Footer, Navigation, SectionIntro, WorkflowToolsMarquee } from "./components";
import { SelectedWorkGallery } from "./project-gallery";

export const metadata: Metadata = {
  title: "Edsun Caldoza | Graphic Designer & Video Editor",
  description: "Explore graphic design, video editing, presentation design, and web work that helps messages land clearly.",
};

const expertise = [
  { number: "01", title: "Graphic Design", text: "If you need a message to land clearly, I create campaign graphics, presentations, book covers, social content, and print materials around it.", tools: "Photoshop · Canva · Google Slides" },
  { number: "02", title: "Video Editing", text: "If your video needs to hold attention, I shape short edits with clear captions, titles, pacing, and simple motion graphics.", tools: "Short-form · Captions · Motion graphics" },
  { number: "03", title: "Web & Digital", text: "If your audience needs a clear next step, I design landing pages and responsive layouts that make it easy to find.", tools: "Figma · WordPress · HTML · CSS" },
];

const portfolioStats = [
  { value: 500, suffix: "+", label: "Graphic Design Projects" },
  { value: 50, suffix: "+", label: "Webinar Presentations" },
  { value: 70, suffix: "+", label: "Web Design Projects" },
  { value: 7, suffix: "+ years", label: "Professional experience" },
];

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <section className="hero-shell">
          <div className="hero-pattern" aria-hidden="true" />
          <HeroGridHighlight />
          <div className="hero">
            <div className="hero-copy">
              <RotatingRole />
              <h1 className="hero-pitch"><span className="hero-title-line">I build Visuals<br className="hero-title-mobile-break" />{" "}that</span><br className="hero-title-break" />{" "}<span className="hero-title-line"><span className="hero-gradient-word">Connect</span> and <span className="hero-gradient-word">Convert</span>.</span></h1>
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

        <section className="proof-strip reveal" aria-label="Selected career highlights" data-count-strip data-stagger>
          {portfolioStats.map((stat) => (
            <div key={stat.label}>
              <strong>
                <span className="sr-only">{stat.value}{stat.suffix}</span>
                <span className="count-up-value" aria-hidden="true" data-count-value data-count-to={stat.value} data-count-suffix={stat.suffix}>{stat.value}{stat.suffix}</span>
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="home-about" id="about">
          <SectionIntro number="01" label="About & expertise" title={<>Design that helps your<br />message land.</>} />
          <div className="about-expertise-grid">
            <div className="about-expertise-copy reveal">
              <p className="about-lead">If you need a clear way to share your message, I bring seven years of experience across print, presentations, web design, and digital content.</p>
              <p>You can expect thoughtful visual direction, organized files, useful revisions, and work that is ready to use.</p>
            </div>
            <div className="expertise-list reveal" data-stagger>
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
          <SectionIntro number="02" label="Selected work" title={<>Get to know me<br />through my work.</>} />
          <SelectedWorkGallery />
          <a className="button button-primary selected-work-cta" href="https://www.behance.net/edsuncaldoza" target="_blank" rel="noreferrer">View all Projects <span aria-hidden="true">↗</span></a>
        </section>

        <section className="testimonial reveal" data-stagger>
          <p className="section-label"><span>03</span>Client feedback</p>
          <blockquote>“Such a great experience working with Edsun. He never hesitated to provide a revision, no matter how small the detail. I would love to work with him again.”</blockquote>
          <div className="quote-person"><img src="/images/testimonial-1.jpg" alt="William Meyer" loading="lazy" /><div><strong>William Meyer</strong><span>Client · United States</span></div></div>
        </section>

        <section className="tools-section" id="tools">
          <SectionIntro number="04" label="Tools & workflow" title={<>Tools I use to get<br />the work done.</>} />
          <div className="tools-copy-row reveal">
            <p>Here are the tools I rely on to move your idea from first layout to final delivery across print, video, and web.</p>
          </div>
          <WorkflowToolsMarquee />
        </section>

        <section className="contact-close reveal" data-stagger id="contact">
          <div className="contact-topline"><p className="section-label"><span>05</span>Contact</p><span>Based in the Philippines · Available worldwide</span></div>
          <h2>Have a project<br /><span>in mind?</span></h2>
          <div className="contact-bottom">
            <p>Tell me what you need to communicate. I’m available for freelance projects and remote roles in graphic design, video editing, and web design.</p>
            <a className="contact-email" href="mailto:edsunjcaldoza@gmail.com">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
