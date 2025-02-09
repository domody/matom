"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";
import appData from "@/app/app/appData.json";
import { useState } from "react";
import { useEffect } from "react";


export function ChatMessage({ className, author, content, firstMessage, clientOwned }: { className?: string, author: string, firstMessage: boolean, content: string, clientOwned: boolean }) {
    var flattenRightEdge = clientOwned && !firstMessage;
    var flattenLeftEdge = !clientOwned && !firstMessage;
    return (
    <div>

        <div className={`px-1 text-text-muted ${firstMessage? "mb-1" : ""} w-max text-xs ${clientOwned ? "ml-auto" : "mr-auto"}`}>
        {
        firstMessage ?
        clientOwned ? (
        <div className="flex flex-row items-end gap-x-1">
            <span>Sent by you at 5:33 PM</span>
            <img src="/pfp.jpg" className="rounded-3xl h-7"/>
        </div> 
        ):
        (
        <div className="flex flex-row items-end gap-x-1">
            <img src="/pfp.jpg" className="rounded-3xl h-7"/>
            <span>Sent by {author} at 5:33 PM</span>
        </div> 
        )
        : null
        }
        </div>
            
        <div className={`px-3 py-1 mt-0.5 max-w-3/4 md:max-w-1/2 rounded-t-xl w-max text-lg  ${flattenRightEdge ? "!rounded-r-xs" : ""} ${flattenLeftEdge ? "!rounded-l-xs" : ""} ${clientOwned ? "bg-accent-muted rounded-l-xl rounded-br-xs ml-auto" : "bg-surface-3 rounded-r-xl rounded-bl-xs mr-auto"}`}>
            {content}
        </div>
    </div>
  );
}
