import React from "react";

const AnalyticsSection = () => {
  return (
    <div className="dark:from-dark-900 dark:via-dark-900 dark:to-dark-800 flex w-full flex-col items-center justify-start bg-gradient-to-b from-white via-white to-gray-100 py-48">
      <div className="container relative flex w-full flex-col items-start justify-start gap-16">
        <div className="flex w-full flex-col items-center justify-center gap-2 text-center">
          <p className="w-full font-medium">Features</p>
          <h1 className="w-full text-5xl font-semibold opacity-95">
            Be efficient. Work faster.
          </h1>
          <p className="mt-4 w-full leading-relaxed opacity-70">
            Insights & Analytics, Time Tracking, Focus Mode, Offline Mode, AI
            Assistant (maybe) <br /> Will need a seperate section for
            Integrations, Mobile?, Git workflows etc.
          </p>
        </div>
        <div className="h-[750px]"></div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
