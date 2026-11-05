"use client";

import { useTheme } from "next-themes";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.05 5.05l1.56 1.56M17.39 17.39l1.56 1.56M5.05 18.95l1.56-1.56M17.39 6.61l1.56-1.56"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M20.7 14.3A8.5 8.5 0 0 1 9.7 3.3 8.8 8.8 0 1 0 20.7 14.3z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle color theme"
      aria-pressed={isDark}
      suppressHydrationWarning
      className="grid h-11 w-11 place-items-center rounded-full border-2 border-border bg-surface-strong text-cocoa transition hover:border-rose hover:text-rose"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
