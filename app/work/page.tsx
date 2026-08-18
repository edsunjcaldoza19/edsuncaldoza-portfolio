import type { Metadata } from "next";
import { PageShell, ProjectSlotCard } from "../components";
import { projectSlotsForCategory, realProjectCount, workCategories } from "../data";

export const metadata: Metadata = {
  title: "Selected Work | Edsun Caldoza",
  description: "Graphic design, web, presentation, app, book cover, and print work by Edsun Caldoza.",
};

export default function WorkPage() {
  return (
    <PageShell active="work">
      <main className="inner-page work-page" id="main-content">
        <section className="work-hero reveal" data-stagger>
          <p className="eyebrow">Project index · 2023 to 2026</p>
          <h1>Graphic design, video,<br /><span>and digital work.</span></h1>
          <p>A selection of campaign systems, presentations, landing pages, app concepts, print projects, and tutorial videos.</p>
        </section>
        <nav className="work-index reveal" data-stagger aria-label="Project categories">
          {workCategories.map((category) => <a key={category.id} href={`#${category.id}`}><span>{category.number}</span>{category.title}</a>)}
        </nav>
        {workCategories.map((category) => {
          const slots = projectSlotsForCategory(category.id);
          const projectCount = realProjectCount(category.id);
          return (
            <section className="work-group" id={category.id} key={category.id}>
              <div className="work-group-head reveal" data-stagger>
                <div><p className="section-label"><span>{category.number}</span>{category.title}</p><p>{category.description}</p></div>
                <span>{projectCount} {projectCount === 1 ? "project" : "projects"} · {slots.length} slots</span>
              </div>
              <div className="project-slot-grid">{slots.map((slot, index) => <ProjectSlotCard key={slot.kind === "project" ? slot.project.slug : slot.id} slot={slot} index={index} />)}</div>
            </section>
          );
        })}
      </main>
    </PageShell>
  );
}
