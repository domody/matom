import { cn } from "@/app/utils/cn";
import { ChevronDown, Search } from "lucide-react";
import appData from "@/app/app/appData.json";

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("h-full flex flex-col p-4 pb-8 bg-surface-1 sm:w-64 border-r border-border-muted", className)}>
      {/* Top section */}
      <div className="flex items-center gap-x-2 w-full overflow-x-scroll scrollbar-hide">
        <div className="size-6 rounded-full bg-primary-foreground shrink-0" />
        <span className="text-text-muted ml-2">/</span>
        <div className="px-2 py-1 rounded hover:bg-surface-2 cursor-pointer flex items-center gap-x-1 group transition-all">
          <p className="text-text-secondary group-hover:text-primary-foreground transition-all">
            workspace
          </p>
          <ChevronDown className="size-4 mt-1 stroke-text-muted group-hover:stroke-primary-foreground transition-all" />
        </div>
      </div>
      {/* Search */}
      <div className="relative mt-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded bg-surface-2 h-6 border border-border focus:border-white/15 outline-0 placeholder:text-sm text-sm pl-7"
        ></input>
        <Search className="size-[14px] stroke-text-muted absolute top-1.5 left-2" />
      </div>
      {/* Links */}
      <div className="flex flex-col mt-6">
        <p className="text-xs text-text-muted mb-2">Workspace</p>
        <div className="w-full flex flex-col items-start justify-start space-y-0.5">
          {appData.links.sidebar.pages.map((page, index) => {
            return (
              <div
                className="w-full hover:bg-surface-2 flex justify-start px-2 items-center text-sm text-text-secondary h-8 rounded cursor-pointer"
                key={"sidebarLink." + index}
              >
                {page.name}
              </div>
            );
          })}
        </div>
      </div>
      {/* Bottom Links */}
      <div className="mt-auto flex flex-col">
        {appData.links.sidebar.options.map((page, index) => {
          return (
            <div
              className="w-full hover:bg-surface-2 flex justify-start px-2 items-center text-sm text-text-secondary h-8 rounded cursor-pointer"
              key={"sidebarLink." + index}
            >
              {page.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
