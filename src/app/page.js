import "./globals.css";

import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import TasksSection from "./components/TasksSection";
import DocSection from "./components/DocSection";
import AnalyticsSection from "./components/AnalyticsSection";
import { CTASection, FooterSection } from "./components/FooterContent";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <Navbar />
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
    </div>
  );
}
