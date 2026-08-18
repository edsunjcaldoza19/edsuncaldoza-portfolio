import Link from "next/link";
import { CSSProperties, ReactNode } from "react";
import { NavigationController, ThemeToggle } from "./client-components";
import type { Project, ProjectSlot } from "./data";

const email = "mailto:edsunjcaldoza@gmail.com";
const navigationSections = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Work", href: "/#selected-work", section: "selected-work" },
  { label: "Tools", href: "/#tools", section: "tools" },
  { label: "Contact", href: "/#contact", section: "contact" },
] as const;

type WorkflowTool = {
  name: string;
  icon: string;
};

const workflowTools: readonly WorkflowTool[] = [
  { name: "Adobe Photoshop", icon: "/icons/tools/adobe-photoshop.svg" },
  { name: "Figma", icon: "/icons/tools/figma.svg" },
  { name: "Canva", icon: "/icons/tools/canva.svg" },
  { name: "CapCut", icon: "/icons/tools/capcut.svg" },
  { name: "WordPress", icon: "/icons/tools/wordpress.svg" },
  { name: "HTML", icon: "/icons/tools/html.svg" },
  { name: "CSS", icon: "/icons/tools/css.svg" },
  { name: "JavaScript", icon: "/icons/tools/javascript.svg" },
  { name: "PHP", icon: "/icons/tools/php.svg" },
  { name: "MySQL", icon: "/icons/tools/mysql.svg" },
  { name: "Microsoft Office Suite", icon: "/icons/tools/microsoft-office.svg" },
  { name: "Google Workspace", icon: "/icons/tools/google-workspace.svg" },
  { name: "Google Slides", icon: "/icons/tools/google-slides.svg" },
] as const;

export function Navigation({ active = "home" }: { active?: string }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" data-scrolled="false">
        <div className="nav-inner">
          <Link className={`brand ${active === "home" ? "active" : ""}`} href="/" aria-label="Edsun Caldoza, home" aria-current={active === "home" ? "page" : undefined}>
            <span className="brand-mark">EC</span>
            <span className="brand-name">Edsun Caldoza</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigationSections.map((item) => <a key={item.section} href={item.href} data-section-link data-nav-section={item.section}>{item.label}</a>)}
            <ThemeToggle />
            <a className="nav-resume" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Toggle navigation menu">
              <span className="hamburger-icon" aria-hidden="true"><span /><span /><span /></span>
            </summary>
            <nav aria-label="Mobile navigation">
              {navigationSections.map((item) => <a key={item.section} href={item.href} data-section-link data-nav-section={item.section}>{item.label}</a>)}
              <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
              <ThemeToggle />
            </nav>
          </details>
          <div className="scroll-progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
            <span />
          </div>
        </div>
        <NavigationController />
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-bottom">
          <div className="footer-identity">
            <strong>Edsun Caldoza</strong>
            <span>Graphic Designer &amp; Video Editor</span>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            {navigationSections.map((item) => <a key={item.section} href={item.href} data-section-link>{item.label}</a>)}
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
  const projectUrl = project.behance ?? `/work/${project.slug}`;
  const externalLinkProps = project.behance ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <article className="project-card reveal" data-reveal="card" style={{ "--motion-order": index % 2 } as CSSProperties}>
      <a className="project-image-wrap" href={projectUrl} aria-label={`View ${project.title} project${project.behance ? " on Behance" : ""}`} {...externalLinkProps}>
        {project.video && <span className="play-pill">Video</span>}
        <img src={project.image} alt={project.imageAlt ?? `${project.title} project preview`} loading={index > 1 ? "lazy" : "eager"} />
        <span className="project-open" aria-hidden="true">↗</span>
      </a>
      <div className="project-meta">
        <div className="project-overline"><span>{number}</span><span>{project.kicker}</span></div>
        <h3><a href={projectUrl} {...externalLinkProps}>{project.title}</a></h3>
        <p className="project-summary">{project.summary}</p>
        <a className="text-link" href={projectUrl} {...externalLinkProps}>View Project <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

export function ProjectSlotCard({ slot, index = 0 }: { slot: ProjectSlot; index?: number }) {
  if (slot.kind === "project") return <ProjectCard project={slot.project} index={index} />;

  const number = String(index + 1).padStart(2, "0");
  return (
    <article className="project-card project-placeholder reveal" data-reveal="card" style={{ "--motion-order": index % 2 } as CSSProperties}>
      <div className="project-placeholder-media" aria-hidden="true"><span>Coming soon</span></div>
      <div className="project-meta">
        <div className="project-overline"><span>{number}</span><span>Future work</span></div>
        <h3>{slot.title}</h3>
        <p className="project-summary">{slot.summary}</p>
      </div>
    </article>
  );
}

export function SectionIntro({ number, label, title }: { number: string; label: string; title: ReactNode }) {
  return (
    <div className="section-intro reveal" data-stagger>
      <p className="section-label"><span>{number}</span>{label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function ToolList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="tools-list" aria-label={duplicate ? undefined : "Workflow tools"} aria-hidden={duplicate ? "true" : undefined}>
      {workflowTools.map((tool) => (
        <li className="tool-tile" key={`${duplicate ? "duplicate-" : ""}${tool.name}`} title={tool.name}>
          <img src={tool.icon} alt="" width="48" height="48" loading="lazy" />
          <span className="sr-only">{tool.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function WorkflowToolsMarquee() {
  return (
    <div className="tools-marquee">
      <div className="tools-track">
        <ToolList />
        <ToolList duplicate />
      </div>
    </div>
  );
}
