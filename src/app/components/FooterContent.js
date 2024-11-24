import React from "react";

const CTASection = () => {
  return (
    <div className="flex w-full flex-col items-center justify-start bg-gradient-to-b from-gray-100 to-gray-200 py-24">
      <div className="relative flex w-full max-w-5xl flex-col items-start justify-start gap-16">
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
    <div className="flex w-full flex-col items-center justify-start bg-white border-t border-gray-300 py-24">
      <div className="relative flex w-full max-w-5xl flex-col items-start justify-start gap-16">
        <div className="flex w-full items-center justify-between gap-2 text-left">
            Footer
        </div>
      </div>
    </div>
  );
};

export { CTASection, FooterSection };
