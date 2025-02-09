"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";
import appData from "@/app/app/appData.json";
import { useRouter } from 'next/navigation'

export function ChatItem({ className, name }: { className?: string, name: string }) {
  const router = useRouter()
  return (
    <div
      className={cn(
          "border-border hover:bg-surface-1 flex h-16 w-full cursor-pointer items-center justify-start border-b px-3 py-1 text-sm transition-all group",
        className,
      )}
      onClick={() => router.push('/app/chats/'+name)}
      >
        <div className="flex gap-x-3 flex-row">
            <img src="/pfp.jpg" className="rounded h-10"/>
            <div className="flex flex-col gap-y-1 mt-1">
                <div className="font-bold text-left text-md w-max leading-none ">
                    {name}
                    <div className="bg-accent h-0.5 w-0 rounded group-hover:w-full transition-all">
                </div>
                </div>
                <div className="text-left text-text-muted leading-none">
                    Message...
                </div>
            </div>
        </div>
    </div>
  );
}
