"use client"

import { ChatSidebar } from "@/app/components/navigation/ChatSidebar";
import { ChatMessage } from "@/app/components/information/ChatMessage";
import { useParams } from "next/navigation";
import exampleData from "@/app/app/exampleData.json";
import * as React from "react";

export default function chatPage() {
    const params = useParams<{ tag: string; slug: string }>();
    const chatId = params.slug;
    return (
        <div className="flex w-[calc(100%-16rem)] h-full bg-red flex-col">
          <div className="border-border-muted bg-surface-1 flex min-h-14 w-full items-center border-b px-4">
            <h3 className="font-medium">Chats</h3>
          </div>
          <div className="flex flex-row h-[calc(100%-3.5rem)] bg-surface-0">
            <div className="">
            <ChatSidebar/>
            </div>
            <div className="flex flex-col-reverse overflow-y-scroll w-full h-full p-6">
                {/* Chat content goes here */}
                {exampleData.messages.map((element, index) => {
                var author = element[0];
                var content = element[1];
                var isFirstMessage = false;
                if (index != exampleData.messages.length-1 && exampleData.messages[index+1][0] != author) {
                    isFirstMessage = true;
                }
                return (
                    <React.Fragment key={index}>
                        <ChatMessage author={author} content={content} firstMessage={isFirstMessage} clientOwned={author == "Matthew"}/>
                    </React.Fragment>
                );
                })}
            </div>
          </div>
        </div>
    );
}