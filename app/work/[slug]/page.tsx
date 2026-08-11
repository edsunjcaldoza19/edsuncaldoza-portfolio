import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "../../components";
import { projectBySlug, projects } from "../../data";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return { title: `${project.title} — Edsun Caldoza`, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <PageShell active="work">
      <main className="case-study" id="main-content">
        <header className="case-header">
          <div className="case-heading"><p className="eyebrow">{project.category} · {project.year}</p><h1>{project.title}</h1><p>{project.summary}</p></div>
          <div className="case-hero-media">
            {project.video ? <video controls muted playsInline preload="metadata" poster={project.image}><source src="/videos/edsun-reel.mp4" type="video/mp4" /></video> : <img src={project.image} alt={`${project.title} final presentation`} />}
          </div>
        </header>
        <section className="case-facts" aria-label="Project details">
          <div><span>Client / context</span><strong>{project.client}</strong></div>
          <div><span>Role</span><strong>{project.role}</strong></div>
          <div><span>Tools</span><strong>{project.tools}</strong></div>
          <div><span>Deliverables</span><strong>{project.deliverables}</strong></div>
        </section>
        <section className="case-narrative"><p className="section-label"><span>01</span>The brief</p><div><h2>{project.challenge}</h2><p>{project.approach}</p></div></section>
        <section className={`case-art project-${project.accent}`}><span>Selected outcome</span><img src={project.image} alt={`Detailed view of ${project.title}`} loading="lazy" /></section>
        <section className="case-result"><p className="section-label"><span>02</span>Outcome</p><div><h2>Designed to stay clear at every size.</h2><p>{project.result}</p>{project.behance && <a className="button button-primary" href={project.behance} target="_blank" rel="noreferrer">View full project on Behance</a>}</div></section>
        <Link className="next-project" href={`/work/${next.slug}`}><span>Next project</span><strong>{next.title}</strong><i aria-hidden="true">→</i></Link>
      </main>
    </PageShell>
  );
}
