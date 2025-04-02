// components/home/FeatureSection.tsx

import React from "react";
import {
  PresentationChartLineIcon,
  DocumentPlusIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import CustomLink from "../ui_blocks/CustomLink";

const features = [
  {
    name: "Task Creation",
    description:
      "Design tasks that fit your campaign needs and connect with the right influencers.",
    href: "#",
    icon: DocumentPlusIcon,
  },
  {
    name: "Influencer Connection",
    description:
      "Find and collaborate with influencers who align with your brand vision effortlessly.",
    href: "#",
    icon: UserGroupIcon,
  },
  {
    name: "Complete Transparency",
    description:
      "Track progress, payments, and performance metrics in real-time. Both agencies and influencers have full visibility into campaign status, ensuring accountability and building trust throughout the collaboration process.",
    href: "#",
    icon: PresentationChartLineIcon,
  },
];

const FeatureSection: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-rose-600">Connect</h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
            Empower Influencers and Streamline Your Tasks
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Agents can easily create tasks tailored for influencers, ensuring
            seamless collaboration. This platform bridges the gap between
            creativity and execution, making influencer marketing more
            efficient.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="size-5 flex-none text-rose-600"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <CustomLink
                      href={feature.href}
                      className="text-sm/6 font-semibold text-rose-600"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </CustomLink>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
export default FeatureSection;
