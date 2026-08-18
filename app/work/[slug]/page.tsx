import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "../../components";
import {
  projectActionLabel,
  projectBySlug,
  projectExternalPlatform,
  projectExternalUrl,
  projects,
  workCategoryById,
} from "../../data";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "edsun-caldoza.vercel.app";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = `${project.title} | Edsun Caldoza`;
  const image = new URL(project.image, metadataBase).toString();
  const url = new URL(`/work/${project.slug}`, metadataBase).toString();
  const imageAlt = project.imageAlt ?? `${project.title} project preview`;

  return {
    metadataBase,
    title,
    description: project.summary,
    openGraph: {
      type: "article",
      url,
      title,
      description: project.summary,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const projectNumber = String(index + 1).padStart(2, "0");
  const externalUrl = projectExternalUrl(project);
  const externalPlatform = projectExternalPlatform(project);
  const actionLabel = projectActionLabel(project);

  return (
    <PageShell active="work">
      <main className="case-study" id="main-content">
        <header className="case-header">
          <Link className="case-back" href="/work">← All projects</Link>
          <div className="case-heading reveal" data-stagger><p className="eyebrow">{projectNumber} · {workCategoryById(project.categoryId).title} · {project.year}</p><h1>{project.title}</h1><p>{project.summary}</p></div>
          <div className="case-hero-media reveal" data-reveal="media">
            {project.video && externalUrl
              ? <a className="case-video-poster" href={externalUrl} target="_blank" rel="noreferrer" aria-label={`${actionLabel}: ${project.title}${externalPlatform ? ` on ${externalPlatform}` : ""}`}><img src={project.image} alt={project.imageAlt ?? `${project.title} video preview`} /><span>Watch Video <i aria-hidden="true">↗</i></span></a>
              : <img src={project.image} alt={project.imageAlt ?? `${project.title} final presentation`} />}
          </div>
        </header>
        <section className="case-facts reveal" data-stagger aria-label="Project details">
          <div><span>Client / context</span><strong>{project.client}</strong></div>
          <div><span>Role</span><strong>{project.role}</strong></div>
          <div><span>Tools</span><strong>{project.tools}</strong></div>
          <div><span>Deliverables</span><strong>{project.deliverables}</strong></div>
        </section>
        <section className="case-narrative reveal" data-stagger><p className="section-label"><span>01</span>Challenge and approach</p><div><h2>{project.challenge}</h2><p>{project.approach}</p></div></section>
        <section className={`case-art project-${project.accent} reveal`} data-reveal="media"><span>Final work</span><img src={project.image} alt={`Detailed view of ${project.title}`} loading="lazy" /></section>
        <section className="case-result reveal" data-stagger><p className="section-label"><span>02</span>Outcome</p><div><h2>{project.outcomeHeading}</h2><p>{project.result}</p>{externalUrl && <a className="button button-primary" href={externalUrl} target="_blank" rel="noreferrer">{project.video ? "Watch on Dropbox" : `View project on ${externalPlatform ?? "external site"}`}</a>}</div></section>
        <Link className="next-project reveal" href={`/work/${next.slug}`}><span>Next project</span><strong>{next.title}</strong><i aria-hidden="true">↗</i></Link>
      </main>
    </PageShell>
  );
}
