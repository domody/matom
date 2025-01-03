import React from "react";
import HeroPrev from "./HeroPrev";

const HeroSection = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start pt-52">
      <div className="container flex w-full items-start justify-center px-2 md:px-0">
        <div className="flex flex-col items-center justify-start gap-6 text-center">
          <h1 className="text-6xl font-medium opacity-95">Welcome to Matom</h1>
          <p className="text-lg opacity-70">
            Introducing Matom, the cutting-edge task management system tailored
            for both teams and individuals. Discover a sleek, modern interface
            that enhances productivity and collaboration.
          </p>
          <div className="flex items-center justify-center gap-6">
            <a href="/app" className="dark:text-dark-900 rounded-md cursor-pointer bg-black/85 px-6 py-1.5 text-white transition-all dark:bg-white/95 dark:hover:bg-white">
              Get Started
            </a>
            <button className="dark:hover:bg-dark-800 flex items-center justify-center gap-2 rounded-md px-6 py-1.5 text-black/85 transition-all hover:bg-gray-100 dark:text-white/85">
              Learn more
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 -z-10 flex w-screen items-end justify-center overflow-hidden">
        <div className="transform-hero">
          <HeroPrev />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
