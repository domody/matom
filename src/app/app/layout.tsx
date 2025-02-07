import { Sidebar } from "../components/navigation/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-screen overflow-auto">
      <Sidebar />
      {children}
    </main>
  );
}
