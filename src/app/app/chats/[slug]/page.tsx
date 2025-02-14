"use client"

import { ChatSidebar } from "@/app/components/navigation/ChatSidebar";
import { ChatMessage } from "@/app/components/information/ChatMessage";
import { useParams } from "next/navigation";
import exampleData from "@/app/app/exampleData.json";
import * as React from "react";

export default function chatPage() {
  return (
    <div className="flex w-full overflow-hidden flex-row">
    <ChatSidebar/>
    <div className="flex flex-col w-[calc(100%-16rem)] ">
      <div className="border-border-muted bg-surface-0 min-h-14 h-14 w-full flex flex-col justify-center border-b px-4">
        <h3 className="font-medium">Chats</h3>
      </div>
      
      <div className="flex flex-col-reverse overflow-y-scroll w-full h-full shink p-6">
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