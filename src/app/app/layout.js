import "../globals.css";
import { ThemeProvider } from "../_hooks/ThemeContext";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-light-200 box-border overflow-x-hidden antialiased dark:bg-dark-900 dark:text-white`}
      >
        <ThemeProvider>
          <main className="flex h-screen w-screen items-start justify-start overflow-hidden">
            <Sidebar />
            <div className="h-full w-full p-1.5 !pl-0">
              <div className="bg-light-100 border-light-400 h-full w-full rounded-lg border dark:border-dark-600 dark:bg-dark-800"></div>
              {/* {children} */}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
