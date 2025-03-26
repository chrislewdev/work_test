// components/dashboard/ProfileContent.tsx

import React from "react";

export default function ProfileContent() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Profile
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        This is your profile page. Here you can view and manage your profile
        information.
      </p>
    </div>
  );
}
