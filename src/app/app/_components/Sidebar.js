"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../_hooks/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { ChevronLeft, ChevronRight, Clock3 } from "lucide-react";

const Sidebar = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  return (
    <div className="flex h-full w-72 flex-col px-2 py-1.5 dark:bg-dark-900">
      <div className="flex h-8 items-center justify-start">
        <button className="hover:bg-light-200 group aspect-square h-6 overflow-hidden rounded-lg outline-none focus:outline-none dark:hover:bg-dark-600">
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={() => updateTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Sun className="h-4 w-4 text-dark-200 dark:text-dark-100" />
            ) : (
              <Moon className="h-4 w-4 text-dark-200 dark:text-dark-100" />
            )}
          </div>
        </button>

        <button className="hover:bg-light-200 group ml-auto aspect-square h-6 overflow-hidden rounded-lg outline-none focus:outline-none dark:hover:bg-dark-600">
          <div
            className="flex h-full w-full items-center justify-center"
          >
              <ChevronLeft className="h-4 w-4 text-dark-200 dark:text-dark-100" />
          </div>
        </button>

        <button className="hover:bg-light-200 group aspect-square h-6 overflow-hidden rounded-lg outline-none focus:outline-none dark:hover:bg-dark-600">
          <div
            className="flex h-full w-full items-center justify-center"
          >
              <ChevronRight className="h-4 w-4 text-dark-200 dark:text-dark-100" />
          </div>
        </button>
        
        <button className="hover:bg-light-200 group aspect-square h-6 overflow-hidden rounded-lg outline-none focus:outline-none dark:hover:bg-dark-600">
          <div
            className="flex h-full w-full items-center justify-center"
          >
              <Clock3 className="h-4 w-4 text-dark-200 dark:text-dark-100" />
          </div>
        </button>
      </div>

      <div className="h-12 w-full flex justify-start items-center"> </div>
    </div>
  );
};

export default Sidebar;
