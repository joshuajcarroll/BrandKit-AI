// hooks/use-dark-mode.ts
"use client";

import { useEffect, useState } from "react";

function getInitialTheme(): boolean {
  if (typeof window === "undefined") return false; // default on server

  const stored = window.localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;

  // fallback to system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useDarkMode() {
  // ✅ initialize from function instead of setting in an effect
  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

  // ✅ effect now only syncs React state → DOM (no setState here)
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggle = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggle };
}
