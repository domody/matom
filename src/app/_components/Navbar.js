"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../_hooks/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-screen items-center justify-center pt-4">
      <div className="dark:border-dark-700 container z-50 flex h-12 w-full items-center justify-between overflow-hidden rounded-xl border border-gray-300 bg-white/50 !p-1.5 backdrop-blur-md dark:bg-[#0a0a0a]/50">
        <div className="ml-1 flex h-full items-center justify-start">Matom</div>
        <div className="flex h-full items-center justify-center gap-4"></div>
        <div className="flex h-full items-center justify-start gap-4">
          <button className="dark:bg-dark-300/50 group aspect-square h-full overflow-hidden rounded-lg bg-gray-300/50 transition-all active:scale-90">
            <div
              className="flex h-full w-full items-center justify-center"
              onClick={() => updateTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Sun className="h-5 w-5 text-black/60 dark:text-white/95" />
              ) : (
                <Moon className="h-5 w-5 text-black/60 dark:text-white/95" />
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// dark:bg-[#0a0a0a]/[2]
