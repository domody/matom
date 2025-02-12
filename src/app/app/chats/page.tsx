import { ChatSidebar } from "@/app/components/navigation/ChatSidebar";

export default function Chats() {
  return (
    <div className="flex w-[calc(100%-16rem)] bg-red flex-col">
      <div className="border-border-muted bg-surface-0 flex min-h-14 w-full items-center border-b px-4">
        <h3 className="font-medium">Chats</h3>
      </div>
      <div className="h-full bg-black">
      <ChatSidebar/>
      </div>
      <div className="flex w-full flex-col p-4"></div>
    </div>
  );
}
