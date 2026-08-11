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
      <main className="inner-page work-page">
        <section className="work-hero"><p className="eyebrow">Selected work · 2023—2026</p><h1>A growing archive<br />of ideas <em>in motion.</em></h1><p>Campaigns, edits, presentations, publishing, and digital experiences—made to communicate before they decorate.</p></section>
        <nav className="work-index" aria-label="Project categories">{groups.map((group, i) => <a key={group} href={`#${group.toLowerCase().replaceAll(" ", "-").replace("/", "")}`}><span>0{i + 1}</span>{group}</a>)}</nav>
        {groups.map((group) => {
          const groupProjects = projects.filter((project) => project.category === group);
          const id = group.toLowerCase().replaceAll(" ", "-").replace("/", "");
          return <section className="work-group" id={id} key={group}><div className="work-group-head"><p>{group}</p><span>{groupProjects.length.toString().padStart(2, "0")} projects</span></div><div className="project-grid">{groupProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></section>;
        })}
      </main>
    </PageShell>
  );
}
