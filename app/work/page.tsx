import type { Metadata } from "next";
import { PageShell, ProjectCard } from "../components";
import { projects } from "../data";

export const metadata: Metadata = {
  title: "Selected Work — Edsun Caldoza",
  description: "Explore graphic design, video editing, presentation, publishing, and digital product work by Edsun Caldoza.",
};

const groups = ["Video Editing", "Graphic Design", "Web / Digital"] as const;

export default function WorkPage() {
  return (
    <PageShell active="work">
      <main className="inner-page work-page" id="main-content">
        <section className="work-hero">
          <p className="eyebrow">Selected work · 2023—2026</p>
          <h1>Projects made to communicate clearly.</h1>
          <p>Campaigns, edits, presentations, publishing, and digital experiences—designed with purpose and delivered with care.</p>
        </section>
        <nav className="work-index" aria-label="Project categories">
          {groups.map((group) => <a key={group} href={`#${group.toLowerCase().replaceAll(" ", "-").replace("/", "")}`}>{group}</a>)}
        </nav>
        {groups.map((group) => {
          const groupProjects = projects.filter((project) => project.category === group);
          const id = group.toLowerCase().replaceAll(" ", "-").replace("/", "");
          return (
            <section className="work-group" id={id} key={group}>
              <div className="work-group-head"><h2>{group}</h2><span>{groupProjects.length} projects</span></div>
              <div className="project-grid">{groupProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
            </section>
          );
        })}
      </main>
    </PageShell>
  );
}
