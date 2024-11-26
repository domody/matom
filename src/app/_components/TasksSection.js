import React from "react";
import "../globals.css";

const TasksSection = () => {
  return (
    <div className="dark:from-dark-900 dark:via-dark-900 dark:to-dark-800 flex w-full flex-col items-center justify-start bg-gradient-to-b from-white via-white to-gray-100 py-48">
      <div className="container relative flex w-full flex-col items-start justify-start gap-16">
        <div className="flex w-full flex-col items-center justify-center gap-2 text-left">
          <p className="w-full font-medium">Matom for Teams</p>
          <h1 className="w-full text-5xl font-semibold opacity-95">
            Enhanced Task Management
          </h1>
          <p className="mt-4 w-full leading-relaxed opacity-70">
            Experience the power of real-time collaboration and advanced task
            tracking with Matom. Seamlessly integrate with your favorite tools
            to streamline your workflow and elevate your productivity.
          </p>
        </div>
        <div className="h-[900px]"></div>
      </div>
    </div>
  );
};

export default TasksSection;
