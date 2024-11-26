import React from "react";

const CTASection = () => {
  return (
    <div className="dark:from-dark-800 dark:to-dark-700 flex w-full flex-col items-center justify-start bg-gradient-to-b from-gray-100 to-gray-200 py-24">
      <div className="container relative flex w-full flex-col items-start justify-start gap-16">
        <div className="flex w-full items-center justify-between gap-2 text-left">
          <h1 className="w-1/2 text-5xl font-semibold opacity-95">
            Get Started with Matom Today
          </h1>
          <p className="mt-4 leading-relaxed opacity-70">Get Started</p>
        </div>
      </div>
    </div>
  );
};

const FooterSection = () => {
  return (
    <footer className="dark:border-dark-400 dark:bg-dark-900 flex w-full flex-col items-center justify-start border-t border-gray-300 bg-white py-24">
      <div className="container relative flex w-full flex-col items-start justify-start gap-16">
        <div className="flex w-full items-center justify-between gap-2 text-left">
          Footer
        </div>
      </div>
    </footer>
  );
};

export { CTASection, FooterSection };
