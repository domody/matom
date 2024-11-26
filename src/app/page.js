import "./globals.css";
import { ThemeProvider } from "./_hooks/ThemeContext";

import HeroSection from "./_components/HeroSection";
import FeatureSection from "./_components/FeatureSection";
import TasksSection from "./_components/TasksSection";
import DocSection from "./_components/DocSection";
import AnalyticsSection from "./_components/AnalyticsSection";
import { CTASection, FooterSection } from "./_components/FooterContent";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="flex w-screen flex-col items-center justify-center">
        {/*  */}
        <HeroSection />
        {/*  */}
        <FeatureSection />
        {/*  */}
        <TasksSection />
        {/*  */}
        <DocSection />
        {/*  */}
        <AnalyticsSection />
        {/*  */}
        <CTASection />
        {/*  */}
        <FooterSection />
      </main>
    </ThemeProvider>
  );
}
