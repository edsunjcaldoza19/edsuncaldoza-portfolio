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
        <section className="work-hero reveal">
          <p className="eyebrow">Project index · 2023—2026</p>
          <h1>Work made to<br /><span>communicate clearly.</span></h1>
          <p>Campaigns, edits, presentations, publishing, and digital experiences—designed with purpose and delivered with care.</p>
        </section>
        <nav className="work-index reveal" aria-label="Project categories">
          {groups.map((group, index) => <a key={group} href={`#${group.toLowerCase().replaceAll(" ", "-").replace("/", "")}`}><span>0{index + 1}</span>{group}</a>)}
        </nav>
        {groups.map((group, groupIndex) => {
          const groupProjects = projects.filter((project) => project.category === group);
          const id = group.toLowerCase().replaceAll(" ", "-").replace("/", "");
          return (
            <section className="work-group" id={id} key={group}>
              <div className="work-group-head reveal"><p className="section-label"><span>0{groupIndex + 1}</span>{group}</p><span>{groupProjects.length} projects</span></div>
              <div className="project-grid">{groupProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
            </section>
          );
        })}
      </main>
    </PageShell>
  );
}
