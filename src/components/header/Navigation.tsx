// components/header/Navigation.tsx

import React from "react";
import { NavigationProps } from "@/types";

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <div className="hidden lg:flex lg:gap-x-12">
      {items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="text-sm/6 font-semibold text-gray-100"
        >
          {item.name}
        </a>
      ))}
    </div>
  );
};
