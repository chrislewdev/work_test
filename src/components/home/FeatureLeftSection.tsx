// components/home/FeatureLeftSection.tsx

import React from "react";
import {
  GlobeAltIcon,
  QueueListIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Brand Connect",
    description: "Expand your network and connect with top brands.",
    icon: GlobeAltIcon,
  },
  {
    name: "Task Flow",
    description: "Streamlined task management for efficient project execution.",
    icon: QueueListIcon,
  },
  {
    name: "Insight Boost",
    description: "Gain insights and analytics to boost your performance.",
    icon: ArrowTrendingUpIcon,
  },
];

const FeatureLeftSection: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-rose-600">
                Explore
              </h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Unlock New Opportunities
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Our platform bridges the gap between influencers and agents,
                creating a seamless collaboration experience. Enjoy tailored
                opportunities that enhance your reach and effectiveness in the
                digital landscape.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute left-1 top-1 size-5 text-rose-600"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex items-center justify-end lg:order-first">
            <img
              alt="Product screenshot"
              src="/images/photos/product-projects.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeatureLeftSection;
