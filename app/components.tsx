import Link from "next/link";
import { ReactNode } from "react";
import { ThemeToggle } from "./client-components";
import type { Project } from "./data";

const email = "mailto:edsunjcaldoza@gmail.com";

export function Navigation({ active = "" }: { active?: string }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="nav-inner">
          <Link className="brand" href="/" aria-label="Edsun Caldoza, home">
            <span className="brand-mark">EC</span>
            <span className="brand-name">Edsun Caldoza</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link className={active === "work" ? "active" : ""} href="/work">Work</Link>
            <Link className={active === "about" ? "active" : ""} href="/about">About</Link>
            <Link href="/#contact">Contact</Link>
            <ThemeToggle />
            <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Open navigation menu">Menu</summary>
            <nav aria-label="Mobile navigation">
              <Link href="/work">Work</Link>
              <Link href="/about">About</Link>
              <Link href="/#contact">Contact</Link>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
              <ThemeToggle />
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-lead reveal">
          <div>
            <p className="section-kicker">Available for select projects</p>
            <h2>Have something in mind?</h2>
            <p>Let’s make it clear, useful, and worth remembering.</p>
          </div>
          <a className="footer-cta" href={email}>Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
        <div className="footer-bottom">
          <div className="footer-identity">
            <strong>Edsun Caldoza</strong>
            <span>Graphic Designer &amp; Video Editor</span>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/work">Work</Link>
            <Link href="/about">About</Link>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
            <a href={email}>Email</a>
            <a href="https://www.linkedin.com/in/edsun-caldoza/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.behance.net/edsuncaldoza" target="_blank" rel="noreferrer">Behance</a>
          </nav>
          <p className="copyright">© {new Date().getFullYear()} Edsun Caldoza</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children, active }: { children: ReactNode; active?: string }) {
  return <><Navigation active={active} />{children}<Footer /></>;
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <article className="project-card reveal">
      <Link className="project-image-wrap" href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
        {project.video && <span className="play-pill">Video</span>}
        <img src={project.image} alt={`${project.title} project preview`} loading={index > 1 ? "lazy" : "eager"} />
        <span className="project-open" aria-hidden="true">↗</span>
      </Link>
      <div className="project-meta">
        <div className="project-overline"><span>{number}</span><span>{project.category}</span></div>
        <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
        <p className="project-summary">{project.summary}</p>
        <Link className="text-link" href={`/work/${project.slug}`}>View case study <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}

export function SectionIntro({ number, label, title }: { number: string; label: string; title: ReactNode }) {
  return (
    <div className="section-intro reveal">
      <p className="section-label"><span>{number}</span>{label}</p>
      <h2>{title}</h2>
    </div>
  );
}
