// components/home/SignUpCTASection.tsx

import React from "react";
import CustomLink from "../ui_blocks/CustomLink";

const SignUpCTASection: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Unlock Your Influencer Potential
          <p className="mt-6 text-lg/8 text-gray-600 font-normal">
            Join our platform to connect and collaborate today!
          </p>
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
          <CustomLink
            href="#"
            className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            Sign-Up
          </CustomLink>
        </div>
      </div>
    </div>
  );
};
export default SignUpCTASection;
