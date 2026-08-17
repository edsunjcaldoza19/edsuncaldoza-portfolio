"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light";

const themeEvent = "edsun-theme-change";
export const portfolioRoles = ["Designer", "Video Editor", "Creator"] as const;

function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const syncTheme = () => setTheme(currentTheme());
    syncTheme();
    window.addEventListener(themeEvent, syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => {
      window.removeEventListener(themeEvent, syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  function toggleTheme() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("edsun-theme", next);
    setTheme(next);
    window.dispatchEvent(new Event(themeEvent));
  }

  const target = theme === "dark" ? "light" : "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${target} theme`}
      aria-pressed={theme === "light"}
      suppressHydrationWarning
    >
      <span className="theme-toggle-track" aria-hidden="true"><span /></span>
      <span className="theme-toggle-label" suppressHydrationWarning>{target}</span>
    </button>
  );
}

export function NavigationController() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const progress = header?.querySelector<HTMLElement>(".scroll-progress");
    if (!header || !progress) return;

    const sectionLinks = Array.from(header.querySelectorAll<HTMLAnchorElement>("[data-nav-section]"));
    const pageSectionLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-section-link]"));
    const sections = Array.from(new Set(sectionLinks.map((link) => link.dataset.navSection)))
      .map((id) => id ? document.getElementById(id) : null)
      .filter((section): section is HTMLElement => section !== null);
    const mobileMenu = header.querySelector<HTMLDetailsElement>(".mobile-nav");
    const mobileLinks = Array.from(mobileMenu?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const closeMobileMenu = () => mobileMenu?.removeAttribute("open");
    mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollBehavior = (): ScrollBehavior => reducedMotion.matches ? "auto" : "smooth";

    const getHashTarget = (hash: string) => {
      if (!hash) return null;
      try {
        return document.getElementById(decodeURIComponent(hash.slice(1)));
      } catch {
        return null;
      }
    };

    let frame = 0;
    let previousState: boolean | null = null;
    let previousProgress = -1;

    const update = () => {
      frame = 0;
      const isScrolled = window.scrollY > 32;
      if (isScrolled !== previousState) {
        header.dataset.scrolled = String(isScrolled);
        previousState = isScrolled;
      }

      const root = document.documentElement;
      const scrollableHeight = Math.max(0, root.scrollHeight - window.innerHeight);
      const ratio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 1;
      const clamped = Math.min(1, Math.max(0, ratio));
      const percentage = Math.round(clamped * 100);

      progress.style.setProperty("--scroll-progress", String(clamped));
      if (percentage !== previousProgress) {
        progress.setAttribute("aria-valuenow", String(percentage));
        previousProgress = percentage;
      }

      let activeSection = "";
      const sectionMarker = Math.min(window.innerHeight * 0.38, 320);
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= sectionMarker) activeSection = section.id;
      });
      if (sections.length && window.scrollY + window.innerHeight >= root.scrollHeight - 2) {
        activeSection = sections.at(-1)?.id ?? activeSection;
      }
      sectionLinks.forEach((link) => {
        const isActive = link.dataset.navSection === activeSection;
        link.classList.toggle("active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const scrollToHash = (hash: string) => {
      if (!hash) {
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
        scheduleUpdate();
        return true;
      }

      const target = getHashTarget(hash);
      if (!target) return false;
      target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      scheduleUpdate();
      return true;
    };

    const handleSectionLink = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      if (
        event.defaultPrevented
        || event.button !== 0
        || event.metaKey
        || event.ctrlKey
        || event.shiftKey
        || event.altKey
        || link.target === "_blank"
        || link.hasAttribute("download")
      ) return;

      const destination = new URL(link.href, window.location.href);
      const isHomepageLink = pathname === "/" && destination.pathname === "/";
      if (!isHomepageLink || !destination.hash || !getHashTarget(destination.hash)) return;

      event.preventDefault();
      closeMobileMenu();
      if (window.location.hash !== destination.hash) {
        window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${destination.hash}`);
      }
      scrollToHash(destination.hash);
    };

    pageSectionLinks.forEach((link) => link.addEventListener("click", handleSectionLink));

    const handleHistoryNavigation = () => {
      if (pathname === "/") scrollToHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHistoryNavigation);
    window.addEventListener("popstate", handleHistoryNavigation);

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("load", scheduleUpdate, { once: true });

    const resizeObserver = "ResizeObserver" in window
      ? new ResizeObserver(scheduleUpdate)
      : null;
    resizeObserver?.observe(document.documentElement);

    let initialHashFrame = 0;
    if (pathname === "/" && window.location.hash) {
      initialHashFrame = window.requestAnimationFrame(() => {
        initialHashFrame = window.requestAnimationFrame(() => scrollToHash(window.location.hash));
      });
    }

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
      window.removeEventListener("hashchange", handleHistoryNavigation);
      window.removeEventListener("popstate", handleHistoryNavigation);
      mobileLinks.forEach((link) => link.removeEventListener("click", closeMobileMenu));
      pageSectionLinks.forEach((link) => link.removeEventListener("click", handleSectionLink));
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (initialHashFrame) window.cancelAnimationFrame(initialHashFrame);
    };
  }, [pathname]);

  return null;
}

export function RotatingRole() {
  const carouselRoles = [...portfolioRoles, portfolioRoles[0]];

  return (
    <p className="role-heading">
      <span className="sr-only">Hi, I’m Edsun. Designer, Video Editor, and Creator.</span>
      <span className="role-heading-visual" aria-hidden="true">
        <span className="role-prefix">Hi, I’m Edsun -</span>
        <span className="role-viewport">
          <span className="role-track">
            {carouselRoles.map((role, index) => <span className="role-track-item" key={`${role}-${index}`}>{role}</span>)}
          </span>
        </span>
      </span>
    </p>
  );
}

export function HeroGridHighlight() {
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const highlight = highlightRef.current;
    const hero = highlight?.closest<HTMLElement>(".hero-shell");
    if (!highlight || !hero) return;

    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!precisePointer.matches || reducedMotion.matches || !("requestAnimationFrame" in window)) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const renderHighlight = () => {
      frame = 0;
      const bounds = hero.getBoundingClientRect();
      const x = Math.min(bounds.width, Math.max(0, pointerX - bounds.left));
      const y = Math.min(bounds.height, Math.max(0, pointerY - bounds.top));
      highlight.style.setProperty("--hero-grid-x", `${x}px`);
      highlight.style.setProperty("--hero-grid-y", `${y}px`);
      highlight.dataset.active = "true";
    };

    const scheduleHighlight = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(renderHighlight);
    };

    const hideHighlight = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      delete highlight.dataset.active;
    };

    hero.addEventListener("pointerenter", scheduleHighlight, { passive: true });
    hero.addEventListener("pointermove", scheduleHighlight, { passive: true });
    hero.addEventListener("pointerleave", hideHighlight, { passive: true });

    return () => {
      hero.removeEventListener("pointerenter", scheduleHighlight);
      hero.removeEventListener("pointermove", scheduleHighlight);
      hero.removeEventListener("pointerleave", hideHighlight);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={highlightRef} className="hero-grid-highlight" aria-hidden="true" />;
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    elements.forEach((element) => {
      if (!element.hasAttribute("data-stagger")) return;
      Array.from(element.children).forEach((child, index) => {
        if (child instanceof HTMLElement) child.style.setProperty("--motion-order", String(index));
      });
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.dataset.motion = "ready";
    const initiallyVisible = new Set(elements.filter(
      (element) => element.getBoundingClientRect().top < window.innerHeight * 0.95,
    ));
    const initialFrame = window.requestAnimationFrame(() => {
      initiallyVisible.forEach((element) => element.classList.add("is-visible"));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    elements.forEach((element) => {
      if (!initiallyVisible.has(element)) observer.observe(element);
    });
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(initialFrame);
    };
  }, [pathname]);

  return null;
}

export function CountUpObserver() {
  useEffect(() => {
    const strip = document.querySelector<HTMLElement>("[data-count-strip]");
    if (!strip) return;

    const values = Array.from(strip.querySelectorAll<HTMLElement>("[data-count-value]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window) || !("requestAnimationFrame" in window)) return;

    const formatter = new Intl.NumberFormat("en-US");
    let animationFrame = 0;

    const renderValue = (element: HTMLElement, value: number) => {
      element.textContent = `${formatter.format(value)}${element.dataset.countSuffix ?? ""}`;
    };

    const animate = (startTime: number) => {
      const duration = 1200;
      values.forEach((element) => renderValue(element, 0));

      const step = (currentTime: number) => {
        const progress = Math.min(1, (currentTime - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);

        values.forEach((element) => {
          const target = Number(element.dataset.countTo ?? 0);
          renderValue(element, Math.round(target * eased));
        });

        if (progress < 1) animationFrame = window.requestAnimationFrame(step);
      };

      animationFrame = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      animate(performance.now());
      observer.unobserve(strip);
    }, { threshold: 0.3 });

    observer.observe(strip);
    return () => {
      observer.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}
