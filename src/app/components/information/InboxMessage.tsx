"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";
import appData from "@/app/app/appData.json";
import { useState } from "react";
import { useEffect } from "react";


export function InboxMessage({ className, title, content }: { className?: string, title: string, content: string }) {
  return (
    <div
      className={cn(
        "bg-surface-1 border-surface-2 flex flex-col p-4 border-2 rounded hover:scale-[1.01] transition-all mx-6 mt-6 min-h-8",
        className,
      )}
      >
      <div className="flex flex-col space-y-3.5">
        {/* Title*/}
        <div className="font-bold text-lg leading-none underline">
            {title}
        </div>
        {/* Content*/}
        <p className="text-sm text-text-secondary mx-1 text-muted-foreground">
            {content}
        </p>
      </div>
    </div>
  );
}
