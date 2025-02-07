"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";
import appData from "@/app/app/appData.json";
import { useState } from "react";

import {
  ChevronDown,
  Search,
  Inbox,
  ListTodo,
  Calendar,
  File,
  Cog,
  SlidersVertical
} from "lucide-react";
import { useEffect } from "react";

const iconMap: { [key: string]: React.ElementType } = {
  chevronDown: ChevronDown,
  search: Search,
  inbox: Inbox,
  listTodo: ListTodo,
  calendar: Calendar,
  file: File,
  cog: Cog,
  slidersVertical: SlidersVertical,
};

function SidebarLink({
  icon,
  name,
  path,
}: {
  icon?: string;
  name: string;
  path: string;
}) {
  const [pathname, setPathname] = useState<string>("");

  // Get current url after the /app path
  // Store as temp variable
  const _pathname = usePathname().slice(4);

  // If the path is null (i.e. at home), then set pathname to /, else js set it to _pathname
  useEffect(() => {
    if (_pathname == "") {
      setPathname("/");
    } else {
      setPathname(_pathname);
    }
  }, []);

  // Get icon component
  const IconComponent = icon ? iconMap[icon] : null;
  return (
    <a
      className={`group flex h-8 w-full cursor-pointer items-center justify-start gap-x-2 rounded px-2 text-sm ${pathname == path ? "bg-surface-2 text-text-primary" : "hover:bg-surface-2 text-text-muted"}`}
      href={`/app${path}`}
    >
      {IconComponent && (
        <IconComponent
          size={16}
          className="group-hover:stroke-primary-foreground stroke-text-muted transition-all"
        />
      )}
      <p className="group-hover:text-primary-foreground text-text-muted transition-all">
        {name}
      </p>
    </a>
  );
}

export function Sidebar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-surface-1 border-border-muted flex h-full flex-col border-r p-4 pb-8 sm:w-64",
        className,
      )}
    >
      {/* Top section */}
      <div className="scrollbar-hide flex w-full items-center gap-x-2 overflow-x-scroll">
        <div className="bg-primary-foreground size-6 shrink-0 rounded-full" />
        <span className="text-text-muted ml-2">/</span>
        <div className="hover:bg-surface-2 group flex cursor-pointer items-center gap-x-1 rounded px-2 py-1 transition-all">
          <p className="text-text-secondary group-hover:text-primary-foreground transition-all">
            workspace
          </p>
          <ChevronDown className="stroke-text-muted group-hover:stroke-primary-foreground mt-1 size-4 transition-all" />
        </div>
      </div>
      {/* Search */}
      <div className="relative mt-6">
        <input
          type="text"
          placeholder="Search..."
          className="bg-surface-2 border-border h-6 w-full rounded border pl-7 text-sm outline-0 placeholder:text-sm focus:border-white/15"
        ></input>
        <Search className="stroke-text-muted absolute top-1.5 left-2 size-[14px]" />
      </div>
      {/* Defaults */}
      <div className="mt-6 flex flex-col">
        <div className="flex w-full flex-col items-start justify-start space-y-0.5">
          {appData.links.sidebar.defaults.map((page, index) => {
            return (
              <React.Fragment key={index}>
                <SidebarLink
                  name={page.name}
                  path={page.path}
                  icon={page.icon}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* Workspaces */}
      <div className="mt-6 flex flex-col">
        <p className="text-text-muted mb-2 text-xs">Workspace</p>
        <div className="flex w-full flex-col items-start justify-start space-y-0.5">
          {appData.links.sidebar.workspaces.map((page, index) => {
            return (
              <React.Fragment key={index}>
                <SidebarLink
                  name={page.name}
                  path={page.path}
                  icon={page.icon}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* Bottom Links */}
      <div className="mt-auto flex flex-col">
        {appData.links.sidebar.options.map((page, index) => {
          return (
            <React.Fragment key={index}>
              <SidebarLink name={page.name} path={page.path} icon={page.icon} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
