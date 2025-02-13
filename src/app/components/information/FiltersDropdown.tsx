import { ChevronRight } from "lucide-react";
import React, { useState, createContext, useContext } from "react";
import { cn } from "@/app/utils/cn";

interface FiltersDropdownContextProps {
  openItem: string | null;
  setOpenItem: (title: string | null) => void;
}

const FiltersDropdownContext =
  createContext<FiltersDropdownContextProps | null>(null);

function FiltersDropdown({ children }: { children: React.ReactNode }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <FiltersDropdownContext.Provider value={{ openItem, setOpenItem }}>
      <div className="bg-surface-1 w-full rounded-md shadow-md">{children}</div>
    </FiltersDropdownContext.Provider>
  );
}

function FiltersDropdownItem({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const context = useContext(FiltersDropdownContext);
  if (!context)
    throw new Error(
      "FiltersDropdownItem must be used within a FiltersDropdown",
    );

  const { openItem, setOpenItem } = context;
  const isOpen = openItem === title;

  const handleClick = () => {
    setOpenItem(isOpen ? null : title); // Toggle logic
  };
  const childrenCount = React.Children.count(children);

  return (
    <div className="flex w-full flex-col">
      <div
        className="hover:bg-surface-2/50 z-10 flex h-8 w-full cursor-pointer items-center justify-start gap-x-2 px-4 transition-all"
        onClick={handleClick}
      >
        <ChevronRight
          size={16}
          className={cn(
            "stroke-text-secondary transition-transform",
            isOpen && "rotate-90",
          )}
        />
        <p>{title}</p>
      </div>
      <div
        className={`bg-primary flex w-full flex-col overflow-hidden transition-all`}
        style={{ height: isOpen ? childrenCount * 32 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

import { Check } from "lucide-react";
import { HTMLAttributes } from "react";
import { DropdownItem } from "./Dropdown";

interface FiltersDropdownOptionProps extends HTMLAttributes<HTMLDivElement> {
  option: string;
  isActive?: boolean;
}
function FiltersDropdownOption({
  option,
  isActive,
  onClick,
  ...props
}: FiltersDropdownOptionProps) {
  const context = useContext(FiltersDropdownContext);
  if (!context)
    throw new Error(
      "FiltersDropdownOption must be used within a FiltersDropdown",
    );

  const { openItem, setOpenItem } = context;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpenItem(null);
    if (onClick) onClick(event);
  };

  return (
    <div
      {...props}
      onClick={handleClick}
      className={`hover:bg-surface-2 hover:text-text-secondary text-text-muted z-0 flex h-8 shrink cursor-pointer items-center justify-between overflow-hidden transition-all`}
    >
      <DropdownItem
        option={String(option).replace(/([A-Z])/g, ' $1').trim()}
        className="hover:!bg-surface-3/0 px-4"
        endIcon={isActive ? <Check size={16} /> : undefined}
      />
    </div>
  );
}

export { FiltersDropdown, FiltersDropdownItem, FiltersDropdownOption };
