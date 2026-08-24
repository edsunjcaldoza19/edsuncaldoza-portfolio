"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- Scroll lanes are focusable regions with arrow-key browsing. */

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import {
  projectActionLabel,
  projectExternalPlatform,
  projectExternalUrl,
  projectSlotsForCategory,
  realProjectCount,
  workCategories,
  type ProjectSlot,
  type WorkCategory,
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
  const externalUrl = projectExternalUrl(project);
  const projectUrl = externalUrl ?? `/work/${project.slug}`;
  const externalPlatform = projectExternalPlatform(project);
  const actionLabel = projectActionLabel(project);
  const externalLinkProps = externalUrl ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <article className="gallery-project">
      <a className="gallery-project-image" href={projectUrl} aria-label={`${actionLabel}: ${project.title}${externalPlatform ? ` on ${externalPlatform}` : ""}`} {...externalLinkProps}>
        {project.video && <span className="play-pill">Video</span>}
        <img src={project.image} alt={project.imageAlt ?? `${project.title} project preview`} loading="lazy" />
        <span className="gallery-project-open" aria-hidden="true">↗</span>
      </a>
      <div className="gallery-project-copy">
        <p className="project-overline"><span>{project.kicker}</span><span>{project.year}</span></p>
        <h3><a href={projectUrl} {...externalLinkProps}>{project.title}</a></h3>
        <p>{project.summary}</p>
        <a className="text-link" href={projectUrl} aria-label={`${actionLabel}: ${project.title}${externalPlatform ? ` on ${externalPlatform}` : ""}`} {...externalLinkProps}>{actionLabel} <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

function CategoryProjectRow({ category }: { category: WorkCategory }) {
  const slots = projectSlotsForCategory(category.id);
  const projectCount = realProjectCount(category.id);
  const hasControls = projectCount > 3;
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [edges, setEdges] = useState({ canPrevious: false, canNext: hasControls });

  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
    const next = {
      canPrevious: track.scrollLeft > 2,
      canNext: track.scrollLeft < maximum - 2,
    };
    setEdges((current) => current.canPrevious === next.canPrevious && current.canNext === next.canNext ? current : next);
  }, []);

  const updateMediaCenter = useCallback(() => {
    const shell = shellRef.current;
    const media = trackRef.current?.querySelector<HTMLElement>(".gallery-project-image, .gallery-placeholder-visual");
    if (!shell || !media) return;
    const shellBox = shell.getBoundingClientRect();
    const mediaBox = media.getBoundingClientRect();
    shell.style.setProperty("--project-media-center", `${mediaBox.top - shellBox.top + mediaBox.height / 2}px`);
  }, []);

  const scheduleEdgeUpdate = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      updateEdges();
    });
  }, [updateEdges]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateMediaCenter();
    scheduleEdgeUpdate();
    track.addEventListener("scroll", scheduleEdgeUpdate, { passive: true });
    const updateLayout = () => {
      updateMediaCenter();
      scheduleEdgeUpdate();
    };
    window.addEventListener("resize", updateLayout, { passive: true });

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateLayout);
    resizeObserver?.observe(track);
    Array.from(track.children).forEach((card) => resizeObserver?.observe(card));

    return () => {
      track.removeEventListener("scroll", scheduleEdgeUpdate);
      window.removeEventListener("resize", updateLayout);
      resizeObserver?.disconnect();
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [scheduleEdgeUpdate, updateMediaCenter]);

  const moveOneCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".gallery-project"));
    const first = cards[0];
    if (!first) return;
    const measuredStep = cards[1] ? cards[1].offsetLeft - first.offsetLeft : first.offsetWidth;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: measuredStep * direction, behavior: reducedMotion ? "auto" : "smooth" });
  }, []);

  const handleTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveOneCard(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveOneCard(1);
    }
  };

  return (
    <section
      className={`project-category-row${hasControls ? " project-category-row-overflow" : ""}`}
      data-project-count={projectCount}
      data-can-previous={edges.canPrevious}
      data-can-next={edges.canNext}
      aria-labelledby={`${category.id}-title`}
    >
      <header className="project-category-header reveal" data-stagger>
        <div className="project-category-heading">
          <h3 id={`${category.id}-title`}>{category.title}</h3>
          <p>{category.description}</p>
        </div>
        <div className="project-category-meta">
          <span>{projectCount} {projectCount === 1 ? "project" : "projects"}</span>
        </div>
      </header>

      <div className="project-carousel-shell" ref={shellRef}>
        <div
          className="project-carousel-track"
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label={`${category.title} projects. Use the left and right arrow keys to browse.`}
          onKeyDown={handleTrackKeyDown}
        >
          {slots.map((slot) => <GallerySlot key={slot.kind === "project" ? slot.project.slug : slot.id} slot={slot} />)}
        </div>
        {hasControls && (
          <div className="project-carousel-controls" aria-label={`${category.title} carousel controls`}>
            <button
              className={`project-carousel-previous${edges.canPrevious ? "" : " is-hidden"}`}
              type="button"
              onClick={() => moveOneCard(-1)}
              disabled={!edges.canPrevious}
              tabIndex={edges.canPrevious ? 0 : -1}
              aria-hidden={edges.canPrevious ? undefined : true}
              aria-label={`Show previous ${category.title} project`}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              className="project-carousel-next"
              type="button"
              onClick={() => moveOneCard(1)}
              disabled={!edges.canNext}
              aria-label={`Show next ${category.title} project`}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
        <span className="project-carousel-fade project-carousel-fade-left" aria-hidden="true" />
        <span className="project-carousel-fade project-carousel-fade-right" aria-hidden="true" />
      </div>
    </section>
  );
}

export function SelectedWorkGallery() {
  return (
    <div className="project-category-list">
      {workCategories.map((category) => <CategoryProjectRow key={category.id} category={category} />)}
    </div>
  );
}
