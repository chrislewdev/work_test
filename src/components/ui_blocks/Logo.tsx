// components/ui_blocks/Logo.tsx

import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-8">
      <text x="10" y="25" fontFamily="Arial" fontSize="20" fontWeight="bold">
        <tspan fill="#000000">Asia Influencer X</tspan>
        <tspan fill="#0EA5E9"> Talent Deck</tspan>
      </text>
    </div>
  );
};

export default Logo;
