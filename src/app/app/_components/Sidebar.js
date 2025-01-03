"use client";
import React, { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

import { ThemeContext } from "../../_hooks/ThemeContext";

import { Sun, Moon } from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  History,
  Music,
  PenBox,
} from "lucide-react";

import {
  Calendar,
  Home,
  Settings,
  Inbox,
  Search,
  SquareCheckBig,
  BookOpenText,
} from "lucide-react";

import { IconButton } from "@components/Buttons";

import DocsList from "./DocsList";
import CreatePage from "./CreatePage";
import { createDocument } from "./createDocument";

const SideBarItem = ({ icon, title, route }) => {
  const pathname = usePathname();

  return (
    <a
      href={`${route}`}
      className={`flex h-8 w-full cursor-pointer items-center justify-start rounded px-2 transition-all hover:bg-light-200 dark:hover:bg-dark-600 ${pathname == route ? "bg-light-200 text-dark-950 dark:bg-dark-600 dark:text-white" : "text-dark-400 dark:text-light-900"}`}
    >
      <div className="flex h-full items-center justify-start pr-2.5">
        {icon}
      </div>
      <div className="flex h-full w-auto items-center justify-start">
        <p className="">{title}</p>
      </div>
    </a>
  );
};

const Sidebar = () => {
  const { theme, updateTheme } = useContext(ThemeContext);

  return (
    <div className="flex h-full w-64 flex-col border-r px-2 py-1.5 dark:border-dark-500 dark:bg-dark-700">
      <div className="flex h-12 items-center justify-start">
        {/* <button className="group aspect-square h-6 overflow-hidden rounded-lg text-dark-200 outline-none hover:bg-light-200 focus:outline-none dark:text-dark-100 dark:hover:bg-dark-600">
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
        </button> */}

        <div className="ml-auto flex items-center justify-start gap-1">
          <IconButton icon={<ChevronLeft className="h-4 w-4" />} />
          <IconButton icon={<ChevronRight className="h-4 w-4" />} />
          <IconButton icon={<Music className="h-4 w-4" />} />
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
        </div>
      </div>

      <div className="flex h-12 w-full items-center justify-between">
        <p>Matom</p>
        <div className="space-x-1">
          <IconButton icon={<Search className="h-4 w-4" />} />
          <CreatePage createDocument={createDocument} />
        </div>
      </div>
      <div className="mb-8 mt-1 space-y-0.5">
        {/* <SideBarItem
          icon={<Search className="h-4 w-4" />}
          title={"Search"}
          route={""}
        /> */}
        <SideBarItem
          icon={<Home className="h-4 w-4" />}
          title={"Home"}
          route={"/app"}
        />

        <SideBarItem
          icon={<Inbox className="h-4 w-4" />}
          title={"Inbox"}
          route={"/app/inbox"}
        />
        <SideBarItem
          icon={<SquareCheckBig className="h-4 w-4" />}
          title={"Tasks"}
          route={"/app/tasks"}
        />
        <SideBarItem
          icon={<Calendar className="h-4 w-4" />}
          title={"Calendar"}
          route={"/app/calendar"}
        />
        <SideBarItem
          icon={<BookOpenText className="h-4 w-4" />}
          title={"Manga"}
          route={"/app/manga"}
        />
        <SideBarItem
          icon={<Settings className="h-4 w-4" />}
          title={"Settings"}
          route={"/app/settings"}
        />
      </div>
      <div className="flex w-full flex-col items-start justify-start">
        <div className="flex w-full items-center justify-between py-1">
          <p className="text-xs text-dark-100">Docs</p>
          <ChevronDown className="h-4 w-4 cursor-pointer stroke-dark-100" />
        </div>
        <div className="flex w-full flex-col items-start justify-start py-2">
          <DocsList />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
