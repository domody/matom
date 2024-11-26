"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../_hooks/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Sidebar = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  return (
    <div className="flex h-full w-72 flex-col px-2 py-2 dark:bg-dark-900">
      <div className="flex h-8 items-center justify-start">
        <button className="hover:bg-light-400 group aspect-square h-8 overflow-hidden rounded-lg outline-none focus:outline-none dark:hover:bg-dark-800">
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={() => updateTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5 text-dark-200 dark:text-dark-100" />
            ) : (
              <Moon className="h-5 w-5 text-dark-200 dark:text-dark-100" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
