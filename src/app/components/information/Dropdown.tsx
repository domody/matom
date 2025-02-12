"use client";
import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { cn } from "@/app/utils/cn";

interface DropdownContextProps {
  dropdownMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenuOpen: () => void;
  onHover: boolean;
  dropdownTriggerRef: React.RefObject<HTMLDivElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

function Dropdown({
  children,
  onHover = false,
  className = "",
}: {
  children: React.ReactNode;
  onHover?: boolean;
  className?: string;
}) {
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState<boolean>(false);

  const toggleMenuOpen = () => setDropdownMenuOpen((prev) => !prev);
  const openMenu = () => setDropdownMenuOpen(true);
  const closeMenu = () => setDropdownMenuOpen(false);

  const dropdownTriggerRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!e.target) return;
      const target = e.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        dropdownTriggerRef.current &&
        !dropdownTriggerRef.current.contains(target)
      ) {
        setDropdownMenuOpen(false);
      }
    }

    if (dropdownMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownMenuOpen]);

  return (
    <DropdownContext.Provider
      value={{
        dropdownMenuOpen,
        openMenu,
        closeMenu,
        toggleMenuOpen,
        onHover,
        dropdownTriggerRef,
        dropdownRef,
      }}
    >
      <div className={cn("relative", className)}>{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({ children, className }: { children: React.ReactNode; className?: string; }) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("DropdownTrigger must be used inside Dropdown");

  const { openMenu, closeMenu, toggleMenuOpen, onHover, dropdownTriggerRef } =
    context;

  return (
    <div
      ref={dropdownTriggerRef}
      onClick={onHover ? undefined : toggleMenuOpen}
      onMouseEnter={onHover ? openMenu : undefined}
      onMouseLeave={onHover ? closeMenu : undefined}
      className={cn("h-full", className)}
    >
      {children}
    </div>
  );
}

function DropdownMenu({
  children,
  position = "center",
  className = "",
}: {
  children: React.ReactNode;
  position?: "left" | "center" | "right";
  className?: string;
}) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("DropdownMenu must be used inside Dropdown");

  const { dropdownMenuOpen, dropdownRef } = context;

  const positionClass =
    {
      left: "left-0 origin-top-left",
      center: "left-1/2 -translate-x-1/2  origin-top",
      right: "right-0 origin-top-right",
    }[position] || "left-1/2 -translate-x-1/2 origin-top";

  return (
    <div
      ref={dropdownRef}
      className={cn(
        `absolute top-[calc(100%+8px)] z-[99] shadow-md transition-all ${positionClass} ${
          dropdownMenuOpen
            ? "opacity-100"
            : "pointer-events-none scale-90 opacity-0"
        }`,
        className,
      )}
    >
      {children}
    </div>
  );
}

export { Dropdown, DropdownMenu, DropdownTrigger };
