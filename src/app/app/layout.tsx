import { Sidebar } from "../components/navigation/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen h-screen overflow-auto flex">
      <Sidebar />
      {children}
      </main>
  );
}