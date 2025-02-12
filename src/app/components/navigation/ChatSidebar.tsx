"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import appData from "@/app/app/appData.json";
import { ChatItem } from "@/app/components/information/ChatItem";
import { useState, useRef } from "react";

export function ChatSidebar({ className }: { className?: string }) {
  const searchBarRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-surface-2 border-border-muted flex h-full w-12 flex-col border-r pt-0 pb-8 transition-all sm:w-64">
      {/* Chat Items */}
        <ChatItem name="Roger Rabbit"/>
        <ChatItem name="Gooby Wooby"/>
        <ChatItem name="Bucko"/>
      </div>
  );
}
