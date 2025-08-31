import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "theme"; // 'light' | 'dark'

const ThemeContext = createContext({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

const getSystemTheme = () => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === "light" || stored === "dark" ? stored : getSystemTheme();
    } catch {
      return getSystemTheme();
    }
  });

  const resolvedTheme = theme;

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(STORAGE_KEY, resolvedTheme);
    } catch {}
  }, [resolvedTheme]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== "light" && stored !== "dark") {
          setTheme(getSystemTheme());
        }
      } catch {}
    };
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [theme, resolvedTheme]
  );

  return React.createElement(ThemeContext.Provider, { value }, children);
};

export const useTheme = () => useContext(ThemeContext);


