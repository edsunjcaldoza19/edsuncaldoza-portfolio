"use client";

import { useEffect, useRef, useState } from "react";
import {
  projectSlotsForCategory,
  realProjectCount,
  workCategories,
  type ProjectSlot,
  type WorkCategory,
  type WorkCategoryId,
} from "./data";

function GallerySlot({ slot }: { slot: ProjectSlot }) {
  if (slot.kind === "placeholder") {
    return (
      <article className="gallery-project gallery-project-placeholder">
        <div className="gallery-placeholder-visual" aria-hidden="true"><span>Coming soon</span></div>
        <div className="gallery-project-copy">
          <p className="project-overline"><span>Future work</span><span>Portfolio slot</span></p>
          <h3>{slot.title}</h3>
          <p>{slot.summary}</p>
        </div>
      </article>
    );
  }

  const { project } = slot;
  const projectUrl = project.behance ?? `/work/${project.slug}`;
  return (
    <article className="gallery-project">
      <a className="gallery-project-image" href={projectUrl} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on Behance`}>
        <img src={project.image} alt={project.imageAlt ?? `${project.title} project preview`} loading="lazy" />
        <span aria-hidden="true">↗</span>
      </a>
      <div className="gallery-project-copy">
        <p className="project-overline"><span>{project.kicker}</span><span>{project.year}</span></p>
        <h3><a href={projectUrl} target="_blank" rel="noreferrer">{project.title}</a></h3>
        <p>{project.summary}</p>
        <a className="text-link" href={projectUrl} target="_blank" rel="noreferrer">View Project <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

function CategoryTrigger({ category, onOpen }: { category: WorkCategory; onOpen: (category: WorkCategory, trigger: HTMLButtonElement) => void }) {
  const count = realProjectCount(category.id);

  return (
    <button className="work-category-card reveal" data-reveal="card" type="button" aria-haspopup="dialog" onClick={(event) => onOpen(category, event.currentTarget)}>
      <span className={`work-category-preview${category.previewImage ? "" : " work-category-preview-placeholder"}`}>
        {category.previewImage
          ? <img src={category.previewImage} alt={category.previewAlt ?? ""} loading="lazy" />
          : <span className="video-category-grid" aria-hidden="true"><i>Video work</i></span>}
        <span className="category-open" aria-hidden="true">Open gallery ↗</span>
      </span>
      <span className="work-category-meta">
        <span className="work-category-number">{category.number}</span>
        <span className="work-category-title">{category.title}</span>
        <span className="work-category-description">{category.description}</span>
        <span className="work-category-count">{count} {count === 1 ? "project" : "projects"}</span>
      </span>
    </button>
  );
}

export function SelectedWorkGallery() {
  const [activeCategoryId, setActiveCategoryId] = useState<WorkCategoryId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeCategory = workCategories.find((category) => category.id === activeCategoryId) ?? null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !activeCategoryId) return;

    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add("dialog-open");
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    return () => window.cancelAnimationFrame(focusFrame);
  }, [activeCategoryId]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      document.documentElement.classList.remove("dialog-open");
      setActiveCategoryId(null);
      lastTriggerRef.current?.focus();
    };
    const handleCancel = (event: Event) => {
      event.preventDefault();
      dialog.close();
    };
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleBackdropClick);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleBackdropClick);
      document.documentElement.classList.remove("dialog-open");
    };
  }, []);

  const openCategory = (category: WorkCategory, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setActiveCategoryId(category.id);
  };

  const closeDialog = () => dialogRef.current?.close();

  return (
    <>
      <div className="work-category-grid" data-stagger>
        {workCategories.map((category) => <CategoryTrigger key={category.id} category={category} onOpen={openCategory} />)}
      </div>

      <dialog
        className="project-gallery-dialog"
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby="project-gallery-title"
      >
        {activeCategory && (
          <div className="project-gallery-shell">
            <header className="project-gallery-header">
              <div>
                <p className="section-label"><span>{activeCategory.number}</span>Project gallery</p>
                <h2 id="project-gallery-title">{activeCategory.title}</h2>
                <p>{activeCategory.description}</p>
              </div>
              <button ref={closeRef} className="project-gallery-close" type="button" onClick={closeDialog} aria-label="Close project gallery">
                <span aria-hidden="true">×</span>
              </button>
            </header>
            <div className="project-gallery-body">
              <div className="project-gallery-grid">
                {projectSlotsForCategory(activeCategory.id).map((slot) => (
                  <GallerySlot key={slot.kind === "project" ? slot.project.slug : slot.id} slot={slot} />
                ))}
              </div>
            </div>
          </div>
        )}
      </dialog>

      <noscript>
        <nav className="category-noscript" aria-label="Browse project categories">
          {workCategories.map((category) => <a key={category.id} href={`/work#${category.id}`}>{category.title}</a>)}
        </nav>
      </noscript>
    </>
  );
}
