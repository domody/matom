import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Matom",
  description: "Made by dom.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`dark:bg-dark-900 box-border overflow-x-hidden bg-white antialiased dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
