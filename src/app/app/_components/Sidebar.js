"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../_hooks/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { ChevronLeft, ChevronRight, History, Music } from "lucide-react";

import { IconButton } from "@components/Buttons";

const Sidebar = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  return (
    <div className="flex h-full w-72 flex-col px-2 py-1.5 dark:bg-dark-900">
      <div className="flex h-12 items-center justify-start">
        <button className="group aspect-square h-6 overflow-hidden rounded-lg text-dark-200 outline-none hover:bg-light-200 focus:outline-none dark:text-dark-100 dark:hover:bg-dark-600">
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={() => updateTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </div>
        </button>

        <div className="ml-auto flex items-center justify-start gap-1">
          <IconButton icon={<ChevronLeft className="h-4 w-4" />} />
          <IconButton icon={<ChevronRight className="h-4 w-4" />} />
          <IconButton icon={<Music className="h-4 w-4" />} />
          <IconButton icon={<History className="h-4 w-4" />} />
        </div>
      </div>

      <div className="flex h-12 w-full items-center justify-start"> </div>
    </div>
  );
};

export default Sidebar;
