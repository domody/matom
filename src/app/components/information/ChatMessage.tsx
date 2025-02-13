"use client";
import * as React from "react";
import { useRouter } from 'next/navigation'

export function ChatMessage({ className, author, content, firstMessage, clientOwned }: { className?: string, author: string, firstMessage: boolean, content: string, clientOwned: boolean }) {
    var flattenRightEdge = clientOwned && !firstMessage;
    var flattenLeftEdge = !clientOwned && !firstMessage;
    var taskStart = content.indexOf("app/tasks?tk=");
    var taskEnd = content.indexOf(" ", taskStart);
    
    if (taskEnd > 36+13+taskStart)
        var taskEnd = taskStart + 36 + 13;

    var task = "";

    if (taskStart != -1)
        task = content.slice(taskStart + 13, taskEnd);
        content = content.replace("app/tasks?tk="+task, "");
    
    const router = useRouter();

    console.log('/app/tasks?tk='+task);

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
        <div className={`items-end gap-x-1 px-3 py-1 mt-0.5 max-w-3/4 md:max-w-1/2 rounded-t-xl w-max text-lg  ${flattenRightEdge ? "!rounded-r-xs" : ""} ${flattenLeftEdge ? "!rounded-l-xs" : ""} ${clientOwned ? "bg-accent-muted rounded-l-xl rounded-br-xs ml-auto" : "bg-surface-3 rounded-r-xl rounded-bl-xs mr-auto"}`}>
            {content}
            {
            taskStart != -1 ?
            (<div className="bg-surface-3 w-max shadow text-text-secondary rounded-xl border-2 px-2 py-0.5 border-surface-1" onClick={() => router.push('/app/tasks?tk='+task)}>
                Task {task}
            </div>)
            : null
            }
            
        </div>
    </div>
  );
}
