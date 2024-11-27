import "../globals.css";
import { ThemeProvider } from "../_hooks/ThemeContext";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`box-border overflow-x-hidden bg-light-200 antialiased dark:bg-dark-900 dark:text-white`}
      >
        <ThemeProvider>
          <main className="flex h-screen w-screen items-start justify-start overflow-hidden">
            <Sidebar />
            <div className="h-full w-full p-1.5 !pl-0">
              <div className="flex h-full w-full items-start justify-start rounded-lg border border-light-400 bg-light-100 dark:border-dark-600 dark:bg-dark-800">
                <div className="flex h-full w-[32rem] flex-col items-start justify-start border-r border-light-400 dark:border-dark-600">
                  <div className="h-12 w-full border-b border-light-400 dark:border-dark-600"></div>
                </div>
                <div className="flex h-full w-[calc(100%-32rem)] flex-col items-start justify-start">
                  <div className="h-12 w-full border-b border-light-400 dark:border-dark-600"></div>
                </div>
                {/* {children} */}
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
