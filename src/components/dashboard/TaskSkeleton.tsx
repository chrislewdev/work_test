// src/components/dashboard/TaskSkeleton.tsx

import React from "react";

interface TaskSkeletonProps {
  count?: number;
}

const TaskSkeleton: React.FC<TaskSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 p-4 animate-pulse"
        >
          <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4 mb-3"></div>
          <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-1/2 mb-6"></div>
          <div className="mt-auto flex flex-col gap-2">
            <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-1/3"></div>
            <div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskSkeleton;
