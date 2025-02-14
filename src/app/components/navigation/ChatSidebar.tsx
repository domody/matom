"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import appData from "@/app/app/appData.json";
import { ChatItem } from "@/app/components/information/ChatItem";
import { useState, useRef } from "react";


import {
  Search,
} from "lucide-react";

export function ChatSidebar({ className }: { className?: string }) {
  const searchBarRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-surface-2 border-border-muted flex h-full w-12 min-w-64 flex-col border-r pt-0 pb-8 transition-all sm:w-64">
      {/* Chat Items */}
        <div className="h-20 bg-black flex flex-col text-text-muted text-lg font-medium p-3 pb-2">
          Search chats
          
        <div className="relative">
          <input
            ref={searchBarRef}
            type="text"
            placeholder="Search..."
            className="bg-surface-2 border-border h-6 w-full cursor-pointer rounded border pl-7 text-sm outline-0 placeholder:text-sm focus:border-white/25"
          ></input>
          <Search className="stroke-text-muted absolute top-1.5 mt-0.5 left-2 size-[14px]" />
        </div>
        </div>
        <ChatItem name="Roger Rabbit"/>
        <ChatItem name="Gooby Wooby"/>
        <ChatItem name="Bucko"/>
      </div>
  );
}
