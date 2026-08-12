import type { Metadata } from "next";
import { PageShell, ProjectCard } from "../components";
import { projects } from "../data";

export const metadata: Metadata = {
  title: "Selected Work | Edsun Caldoza",
  description: "Graphic design, video editing, presentations, web pages, app concepts, and print work by Edsun Caldoza.",
};

const groups = ["Video Editing", "Graphic Design", "Web / Digital"] as const;

export default function WorkPage() {
  return (
    <PageShell active="work">
      <main className="inner-page work-page" id="main-content">
        <section className="work-hero reveal" data-stagger>
          <p className="eyebrow">Project index · 2023 to 2026</p>
          <h1>Graphic design, video,<br /><span>and digital work.</span></h1>
          <p>A selection of campaigns, presentations, edits, web pages, app concepts, and print projects.</p>
        </section>
        <nav className="work-index reveal" data-stagger aria-label="Project categories">
          {groups.map((group, index) => <a key={group} href={`#${group.toLowerCase().replaceAll(" ", "-").replace("/", "")}`}><span>0{index + 1}</span>{group}</a>)}
        </nav>
        {groups.map((group, groupIndex) => {
          const groupProjects = projects.filter((project) => project.category === group);
          const id = group.toLowerCase().replaceAll(" ", "-").replace("/", "");
          return (
            <section className="work-group" id={id} key={group}>
              <div className="work-group-head reveal" data-stagger><p className="section-label"><span>0{groupIndex + 1}</span>{group}</p><span>{groupProjects.length} projects</span></div>
              <div className="project-grid">{groupProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
            </section>
          );
        })}
      </main>
    </PageShell>
  );
}
