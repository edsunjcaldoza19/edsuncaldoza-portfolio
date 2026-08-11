"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const themeEvent = "edsun-theme-change";
export const portfolioRoles = ["A Designer.", "Video Editor.", "Creator."] as const;

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
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const progress = header?.querySelector<HTMLElement>(".scroll-progress");
    if (!header || !progress) return;

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
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("load", scheduleUpdate, { once: true });

    const resizeObserver = "ResizeObserver" in window
      ? new ResizeObserver(scheduleUpdate)
      : null;
    resizeObserver?.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("load", scheduleUpdate);
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

export function RotatingRole() {
  const carouselRoles = [...portfolioRoles, portfolioRoles[0]];

  return (
    <p className="role-heading">
      <span className="sr-only">Hi, I’m Edsun. A Designer, Video Editor, and Creator.</span>
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

export function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.dataset.motion = "ready";
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.95) element.classList.add("is-visible");
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    elements.forEach((element) => {
      if (!element.classList.contains("is-visible")) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
