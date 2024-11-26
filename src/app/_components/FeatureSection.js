import React from "react";
import FeaturePrev from "./FeaturePrev";
import { Box } from "lucide-react";

const FeatureSection = () => {
  return (
    <div className="dark:from-dark-900 dark:via-dark-900 dark:to-dark-800 flex w-full flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-white via-white to-gray-100 py-48">
      <div className="container relative flex w-full flex-col items-start justify-start gap-16">
        <div className="flex w-full flex-col items-start justify-start gap-2 text-left md:pr-2 xl:w-4/6">
          <p className="w-full font-medium">Be faster</p>
          <h1 className="w-full text-5xl font-semibold opacity-95">
            Unlock your productivity
          </h1>
          <p className="mt-4 w-full leading-relaxed opacity-70">
            Experience the power of real-time collaboration and advanced task
            tracking with Matom. Seamlessly integrate with your favorite tools
            to streamline your workflow and elevate your productivity.
          </p>

          <div className="mt-12 flex flex-col items-start justify-start gap-4">
            <div className="flex w-full items-start justify-start">
              <div className="flex items-start justify-start">
                <Box />
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-0.5 pl-3">
                <h1 className="w-full font-semibold">Title Here.</h1>
                <p className="w-full opacity-70">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat atque nostrum blanditiis in quia porro a repellendus
                  quod eligendi eum. Eos laborum quidem explicabo eligendi hic
                  commodi nobis quaerat vitae.
                </p>
              </div>
            </div>

            <div className="flex w-full items-start justify-start">
              <div className="flex items-start justify-start">
                <Box />
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-0.5 pl-3">
                <h1 className="w-full font-semibold">Title Here.</h1>
                <p className="w-full opacity-70">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat atque nostrum blanditiis in quia porro a repellendus
                  quod eligendi eum. Eos laborum quidem explicabo eligendi hic
                  commodi nobis quaerat vitae.
                </p>
              </div>
            </div>

            <div className="flex w-full items-start justify-start">
              <div className="flex items-start justify-start">
                <Box />
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-0.5 pl-3">
                <h1 className="w-full font-semibold">Title Here.</h1>
                <p className="w-full opacity-70">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat atque nostrum blanditiis in quia porro a repellendus
                  quod eligendi eum. Eos laborum quidem explicabo eligendi hic
                  commodi nobis quaerat vitae.
                </p>
              </div>
            </div>

            <div className="flex w-full items-start justify-start">
              <div className="flex items-start justify-start">
                <Box />
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-0.5 pl-3">
                <h1 className="w-full font-semibold">Title Here.</h1>
                <p className="w-full opacity-70">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat atque nostrum blanditiis in quia porro a repellendus
                  quod eligendi eum. Eos laborum quidem explicabo eligendi hic
                  commodi nobis quaerat vitae.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-3/4 top-0 hidden h-full xl:block">
          <FeaturePrev />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
