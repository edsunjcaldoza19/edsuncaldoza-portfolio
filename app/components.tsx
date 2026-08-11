import { ReactNode } from "react";
import type { Project } from "./data";

const email = "mailto:edsunjcaldoza@gmail.com";

export function Navigation({ active = "" }: { active?: string }) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Edsun Caldoza, home">
        <span className="brand-mark">EC</span>
        <span className="brand-name">Edsun Caldoza</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a className={active === "work" ? "active" : ""} href="/work">Work</a>
        <a className={active === "about" ? "active" : ""} href="/about">About</a>
        <a href="/#skills">Skills</a>
        <a href="/#contact">Contact</a>
        <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a>
      </nav>
      <details className="mobile-nav">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          <a href="/work">Work</a>
          <a href="/about">About</a>
          <a href="/#skills">Skills</a>
          <a href="/#contact">Contact</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a>
        </nav>
      </details>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-lead">
        <div>
          <p className="eyebrow light">Have a project in mind?</p>
          <h2>Let&apos;s make something<br />worth noticing.</h2>
        </div>
        <a className="circle-link" href={email} aria-label="Email Edsun">↗</a>
      </div>
      <div className="footer-bottom">
        <div>
          <strong>Edsun Caldoza</strong>
          <span>Graphic Designer &amp; Video Editor</span>
        </div>
        <div className="footer-links">
          <a href="/work">Work</a>
          <a href="/about">About</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
          <a href={email}>Email</a>
          <a href="https://www.linkedin.com/in/edsun-caldoza/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.behance.net/edsuncaldoza" target="_blank" rel="noreferrer">Behance</a>
        </div>
        <div className="availability"><span /> Available for select projects</div>
        <p className="copyright">© {new Date().getFullYear()} Edsun Caldoza</p>
      </div>
    </footer>
  );
}

export function PageShell({ children, active }: { children: ReactNode; active?: string }) {
  return <><Navigation active={active} />{children}<Footer /></>;
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article className={`project-card project-${project.accent}`}>
      <a className="project-image-wrap" href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
        <span className="project-index">0{index + 1}</span>
        {project.video && <span className="play-pill">▶ Reel</span>}
        <img src={project.image} alt={`${project.title} project preview`} loading={index > 1 ? "lazy" : "eager"} />
      </a>
      <div className="project-meta">
        <div>
          <p>{project.category}</p>
          <h3><a href={`/work/${project.slug}`}>{project.title}</a></h3>
        </div>
        <p className="project-summary">{project.summary}</p>
        <a className="text-link" href={`/work/${project.slug}`}>View case study <span>↗</span></a>
      </div>
    </article>
  );
}

export function SectionIntro({ number, label, title }: { number: string; label: string; title: ReactNode }) {
  return (
    <div className="section-intro">
      <p className="section-label"><span>{number}</span>{label}</p>
      <h2>{title}</h2>
    </div>
  );
}
