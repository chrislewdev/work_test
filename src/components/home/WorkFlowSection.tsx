// components/home/WorkFlowSection.tsx

import React from "react";
import CustomLink from "../ui_blocks/CustomLink";

const WorkflowSection: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
          <div className="lg:pr-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-rose-600">
                Showcase
              </h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Create Your Unique Influencer Profile Today
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Influencers can craft detailed profiles that highlight their
                unique skills and showcase their portfolios. This allows them to
                stand out and attract the right opportunities tailored to their
                expertise.
              </p>
              <div className="mt-8">
                <CustomLink
                  href="#"
                  className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-rose-600 text-white text-sm font-semibold rounded-md hover:bg-rose-700 transition-colors"
                >
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </CustomLink>
              </div>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="/images/photos/product-screenshot.png"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:ml-0"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowSection;
