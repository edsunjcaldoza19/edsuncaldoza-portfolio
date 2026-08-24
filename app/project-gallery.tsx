"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- Scroll lanes are focusable regions with arrow-key browsing. */

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
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

type EmblaApi = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;

const stackedCategoryQuery = "(min-width: 768px)";

function subscribeToStackedCategoryViewport(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(stackedCategoryQuery);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getStackedCategoryViewportSnapshot() {
  return window.matchMedia(stackedCategoryQuery).matches;
}

function getStackedCategoryViewportServerSnapshot() {
  return false;
}

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

function CategoryProjectRow({ category, stackIndex }: { category: WorkCategory; stackIndex: number }) {
  const slots = projectSlotsForCategory(category.id);
  const projectCount = realProjectCount(category.id);
  const stackRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const isStackedViewport = useSyncExternalStore(
    subscribeToStackedCategoryViewport,
    getStackedCategoryViewportSnapshot,
    getStackedCategoryViewportServerSnapshot,
  );
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start 90%", "start 25%"],
    trackContentSize: true,
  });
  const incomingY = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const incomingScale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);
  const initialRotation = stackIndex % 2 === 0 ? -1.25 : 1.25;
  const incomingRotate = useTransform(scrollYProgress, [0, 1], [initialRotation, 0]);
  const animateIncomingCard = isStackedViewport && !shouldReduceMotion;
  const stackStyle = {
    "--stack-index": stackIndex + 1,
    "--stack-offset": `${stackIndex * 16}px`,
  } as CSSProperties;
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
    skipSnaps: false,
    slidesToScroll: 1,
    breakpoints: {
      "(prefers-reduced-motion: reduce)": { duration: 0 },
    },
  });
  const [carouselState, setCarouselState] = useState({
    isReady: false,
    hasOverflow: projectCount > 3,
    canPrevious: false,
    canNext: projectCount > 3,
  });

  const updateMediaCenter = useCallback(() => {
    const shell = shellRef.current;
    const media = shell?.querySelector<HTMLElement>(".gallery-project-image, .gallery-placeholder-visual");
    if (!shell || !media) return;
    const shellBox = shell.getBoundingClientRect();
    const mediaBox = media.getBoundingClientRect();
    shell.style.setProperty("--project-media-center", `${mediaBox.top - shellBox.top + mediaBox.height / 2}px`);
  }, []);

  const syncCarouselState = useCallback((api: EmblaApi) => {
    setCarouselState({
      isReady: true,
      hasOverflow: api.scrollSnapList().length > 1,
      canPrevious: api.canScrollPrev(),
      canNext: api.canScrollNext(),
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const initialStateFrame = window.requestAnimationFrame(() => syncCarouselState(emblaApi));
    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);

    return () => {
      window.cancelAnimationFrame(initialStateFrame);
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  useEffect(() => {
    const shell = shellRef.current;
    const media = shell?.querySelector<HTMLElement>(".gallery-project-image, .gallery-placeholder-visual");
    if (!shell || !media) return;

    updateMediaCenter();
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateMediaCenter);
    resizeObserver?.observe(shell);
    resizeObserver?.observe(media);
    return () => resizeObserver?.disconnect();
  }, [updateMediaCenter]);

  const moveOneCard = useCallback((direction: -1 | 1) => {
    if (!emblaApi) return;
    const jump = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (direction < 0) emblaApi.scrollPrev(jump);
    else emblaApi.scrollNext(jump);
  }, [emblaApi]);

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
      ref={stackRef}
      className={`project-category-row${carouselState.hasOverflow ? " project-category-row-overflow" : ""}`}
      style={stackStyle}
      data-project-count={projectCount}
      data-carousel-ready={carouselState.isReady}
      data-carousel-overflow={carouselState.hasOverflow}
      data-can-previous={carouselState.canPrevious}
      data-can-next={carouselState.canNext}
      aria-labelledby={`${category.id}-title`}
    >
      <motion.div
        className="project-category-card"
        style={animateIncomingCard ? { y: incomingY, scale: incomingScale, rotate: incomingRotate } : undefined}
      >
        <header className="project-category-header">
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
            className="project-carousel-viewport"
            ref={viewportRef}
            tabIndex={0}
            role="region"
            aria-label={`${category.title} projects. Use the left and right arrow keys to browse.`}
            onKeyDown={handleTrackKeyDown}
          >
            <div className="project-carousel-track">
              {slots.map((slot) => <GallerySlot key={slot.kind === "project" ? slot.project.slug : slot.id} slot={slot} />)}
            </div>
          </div>
          {carouselState.hasOverflow && (
            <div className="project-carousel-controls" role="group" aria-label={`${category.title} carousel controls`}>
              <button
                className={`project-carousel-previous${carouselState.canPrevious ? "" : " is-hidden"}`}
                type="button"
                onClick={() => moveOneCard(-1)}
                disabled={!carouselState.canPrevious}
                tabIndex={carouselState.canPrevious ? 0 : -1}
                aria-hidden={carouselState.canPrevious ? undefined : true}
                aria-label={`Show previous ${category.title} project`}
              >
                <ChevronLeft aria-hidden="true" size={22} strokeWidth={2} />
              </button>
              <button
                className="project-carousel-next"
                type="button"
                onClick={() => moveOneCard(1)}
                disabled={!carouselState.canNext}
                aria-label={`Show next ${category.title} project`}
              >
                <ChevronRight aria-hidden="true" size={22} strokeWidth={2} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export function SelectedWorkGallery() {
  return (
    <div className="project-category-list">
      {workCategories.map((category, stackIndex) => (
        <CategoryProjectRow key={category.id} category={category} stackIndex={stackIndex} />
      ))}
    </div>
  );
}
