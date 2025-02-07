"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";
import appData from "@/app/app/appData.json";
import { useState } from "react";
import { useEffect } from "react";

function SidebarLink({
  icon,
  name,
  path,
}: {
  icon?: string;
  name: string;
  path: string;
}) {
  const [pathname, setPathname] = useState<string>("");

  // Get current url after the /app path
  // Store as temp variable
  const _pathname = usePathname().slice(4);

  // If the path is null (i.e. at home), then set pathname to /, else js set it to _pathname
  useEffect(() => {
    if (_pathname == "") {
      setPathname("/");
    } else {
      setPathname(_pathname);
    }
  }, []);
}

export function InboxMessage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-surface-1 border-surface-2 flex flex-col border-1 p-5 rounded mx-6 mt-6 min-h-8",
        className,
      )}
      >
      <div className="flex flex-col space-y-3.5">
        {/* Title*/}
        <div className="font-bold text-lg leading-none">
            This goofy ah title
        </div>
        {/* Content*/}
        <p className="text-sm text-text-secondary mx-2 text-muted-foreground">
            Has a message: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. LOLLOLLLOLOL.
            <br/>There is another line here
            <br/>And what do you know! Here is the final line.
        </p>
      </div>
    </div>
  );
}
