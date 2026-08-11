"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const themeEvent = "edsun-theme-change";
export const portfolioRoles = ["Graphic Designer", "Web Designer", "Video Editor"] as const;

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
    if (!header) return;

    let frame = 0;
    let previousState: boolean | null = null;

    const update = () => {
      frame = 0;
      const isScrolled = window.scrollY > 32;
      if (isScrolled === previousState) return;
      header.dataset.scrolled = String(isScrolled);
      previousState = isScrolled;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

export function RotatingRole() {
  const [role, setRole] = useState<string>(portfolioRoles[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const current = portfolioRoles[roleIndex];
      const typeDuration = current.length * 55;
      const deleteDuration = current.length * 32;
      const holdDuration = Math.max(700, 3000 - typeDuration - deleteDuration - 140);

      if (!deleting && characterIndex < current.length) {
        characterIndex += 1;
        setRole(current.slice(0, characterIndex));
        timer = window.setTimeout(tick, 55);
        return;
      }

      if (!deleting) {
        deleting = true;
        timer = window.setTimeout(tick, holdDuration);
        return;
      }

      if (characterIndex > 0) {
        characterIndex -= 1;
        setRole(current.slice(0, characterIndex));
        timer = window.setTimeout(tick, 32);
        return;
      }

      deleting = false;
      roleIndex = (roleIndex + 1) % portfolioRoles.length;
      timer = window.setTimeout(tick, 140);
    };

    timer = window.setTimeout(() => {
      setRole("");
      timer = window.setTimeout(tick, 120);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <h1 className="role-heading">
      <span className="sr-only">Graphic Designer, Web Designer, and Video Editor</span>
      <span className="role-heading-visual" aria-hidden="true">
        {role}<span className="typing-cursor" />
      </span>
    </h1>
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
