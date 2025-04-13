// src/app/userdashboard/available-tasks/not-found.tsx

import React from "react";
import Link from "next/link";

export default function TaskNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Task Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
        Sorry, the task you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/userdashboard/available-tasks"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        View Available Tasks
      </Link>
    </div>
  );
}
