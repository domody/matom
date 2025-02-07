import { InboxMessage } from "@/app/components/information/InboxMessage"

export default function Docs() {
  return (
    <div className="flex w-[calc(100%-16rem)] bg-red flex-col">
      <div className="border-border-muted bg-surface-1 flex min-h-14 w-full items-center border-b px-4">
        <h3 className="font-medium">Inbox</h3>
      </div>
      <div className="h-full">
      <InboxMessage></InboxMessage>
      <InboxMessage></InboxMessage>
      <InboxMessage></InboxMessage>
      <InboxMessage></InboxMessage>
      <InboxMessage></InboxMessage></div>
      <div className="flex w-full flex-col p-4"></div>
    </div>
  );
}
