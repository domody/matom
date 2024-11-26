import React from "react";
import "../globals.css";

const DocSection = () => {
  return (
    <div className="dark:from-dark-900 dark:via-dark-900 dark:to-dark-800 flex w-full flex-col items-center justify-start bg-gradient-to-b from-white via-white to-gray-100 py-48">
      <div className="container relative flex w-full flex-col items-start justify-start gap-16">
        <div className="flex w-full flex-col items-center justify-center gap-2 text-left">
          <p className="w-full font-medium">Documents</p>
          <h1 className="w-full text-5xl font-semibold opacity-95">
            Documents
          </h1>
          <p className="mt-4 w-full leading-relaxed opacity-70">
            Experience the power of real-time collaboration and advanced task
            tracking with Matom. Seamlessly integrate with your favorite tools
            to streamline your workflow and elevate your productivity.
          </p>
        </div>
        <div className="flex w-full flex-col items-start justify-normal gap-8">
          <div className="flex h-8 w-full items-center justify-start">
            <div className="dark:border-dark-700 flex h-full items-center justify-start rounded border border-gray-200">
              <div className="dark:bg-dark-900 dark:hover:bg-dark-800 flex h-full cursor-pointer items-center justify-center rounded bg-white px-3 transition-all hover:bg-gray-50">
                <p className="text-xs opacity-65">Version History</p>
              </div>
              <div className="dark:bg-dark-900 dark:hover:bg-dark-800 flex h-full cursor-pointer items-center justify-center rounded bg-white px-3 transition-all hover:bg-gray-50">
                <p className="text-xs opacity-65">Templates</p>
              </div>
              <div className="dark:bg-dark-900 dark:hover:bg-dark-800 flex h-full cursor-pointer items-center justify-center rounded bg-white px-3 transition-all hover:bg-gray-50">
                <p className="text-xs opacity-65">Markdown Support</p>
              </div>
              <div className="dark:bg-dark-900 dark:hover:bg-dark-800 flex h-full cursor-pointer items-center justify-center rounded bg-white px-3 transition-all hover:bg-gray-50">
                <p className="text-xs opacity-65">Inline Comments</p>
              </div>
              <div className="dark:bg-dark-900 dark:hover:bg-dark-800 flex h-full cursor-pointer items-center justify-center rounded bg-white px-3 transition-all hover:bg-gray-50">
                <p className="text-xs opacity-65">Reference Tasks & People</p>{" "}
                {/* Make this shorter, js here for the idea */}
              </div>
            </div>
          </div>
          <div className="dark:border-dark-700 aspect-video w-full rounded-lg border border-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default DocSection;
