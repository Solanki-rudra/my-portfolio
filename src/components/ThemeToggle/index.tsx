"use client";

import { useTheme } from "@/hooks/useTheme";
import { SunIcon, MoonIcon } from "@/components/Icons";

export default function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useTheme();

  // Prevent layout shift/hydration mismatch during initial render
  if (!isMounted) {
    return <div className="w-10 h-10" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 transition-colors duration-200 text-text-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5" />
      ) : (
        <SunIcon className="w-5 h-5" />
      )}
    </button>
  );
}
