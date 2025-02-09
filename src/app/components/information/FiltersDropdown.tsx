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

  const childrenCount = React.Children.count(children);

  const { openItem, setOpenItem } = context;
  const isOpen = openItem === title;

  const handleClick = () => {
    setOpenItem(isOpen ? null : title); // Toggle logic
  };

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
        style={{ height: isOpen ? childrenCount * 36 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

import { Check } from "lucide-react";
function FiltersDropdownOption({ option }: { option: string }) {
  const isActive = false;
  return (
    <div
      className={`hover:bg-surface-2 hover:text-text-secondary text-text-muted z-0 flex h-9 shrink cursor-pointer items-center justify-between overflow-hidden px-4 py-2 transition-all`}
    >
      <p className="">{option}</p>
      {isActive && <Check size={16} />}
    </div>
  );
}

export { FiltersDropdown, FiltersDropdownItem, FiltersDropdownOption };
