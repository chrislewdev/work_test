// src/app/userdashboard/available-tasks/[id]/client.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Calendar, Clock, DollarSign } from "lucide-react";
import { cn } from "@/app/lib/utils";
import useTaskStore from "@/stores/taskStore";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";
import { formatDate } from "@/app/lib/formatDate";

interface TaskDetailPageClientProps {
  taskId: string;
}

export default function TaskDetailPageClient({
  taskId,
}: TaskDetailPageClientProps) {
  const router = useRouter();
  const { currentTask, fetchTaskById, taskDetailState, resetState } =
    useTaskStore();
  const { loading, error } = taskDetailState;

  const [isAssigned, setIsAssigned] = useState(false);
  // Always start with loading true to ensure smooth transitions between tasks
  const [isLoading, setIsLoading] = useState(true);

  // Reset detail state on component unmount - this will clear currentTask when navigating away
  useResetOnUnmount(resetState.taskDetail);

  // Fetch task data when component mounts or taskId changes
  useEffect(() => {
    // Reset detail state and set loading to true
    resetState.taskDetail();
    setIsLoading(true);

    // Create an async function to fetch task
    const loadTask = async () => {
      try {
        await fetchTaskById(taskId);
      } finally {
        // Set loading to false when fetch completes (success or error)
        setIsLoading(false);
      }
    };

    // Execute the fetch
    loadTask();
  }, [fetchTaskById, taskId, resetState]);

  // Handle task acceptance/removal
  const handleTaskToggle = () => {
    setIsAssigned(!isAssigned);
    // In a real application, you would make an API call to assign/unassign the task
  };

  const getTopicColor = (topic: string) => {
    const topicColors: Record<string, string> = {
      "Social Media":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Product Review":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      TikTok:
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      YouTube: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      LinkedIn:
        "bg-blue-200 text-blue-900 dark:bg-blue-900/40 dark:text-blue-300",
      "Live Stream":
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Photography:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      "Content Writing":
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      Pinterest: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      Podcast:
        "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
      "Video Production":
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      "Web Development":
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    };

    return (
      topicColors[topic] ||
      "bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-300"
    );
  };

  // Show loading state during initial load OR transitions between tasks
  // Note we use isLoading OR loading from the store to catch all loading states
  if (isLoading || loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 w-[70%]">
        <Link
          href="/userdashboard/available-tasks"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Available Tasks
        </Link>

        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-zinc-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2 mb-6"></div>
          <div className="h-20 bg-gray-200 dark:bg-zinc-700 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !currentTask) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 w-[70%]">
        <Link
          href="/userdashboard/available-tasks"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Available Tasks
        </Link>

        <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Task Not Found</h3>
          <p>
            {error ||
              "The requested task could not be found or has been removed."}
          </p>
          <button
            onClick={() => router.push("/userdashboard/available-tasks")}
            className="mt-4 px-4 py-2 bg-white dark:bg-zinc-800 border border-red-300 dark:border-red-700 rounded-md text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            Return to Available Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 w-[70%]">
      {/* Back to tasks link */}
      <Link
        href="/userdashboard/available-tasks"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4"
      >
        <ChevronLeft size={16} className="mr-1" />
        Back to Available Tasks
      </Link>

      {/* Main content - Horizontal Card Layout */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
        {/* Title and status header */}
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700 flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {currentTask.title}
          </h1>
          <div>
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                isAssigned
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  : "bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200"
              )}
            >
              {isAssigned ? "Accepted" : "Available"}
            </span>
          </div>
        </div>

        {/* Description section */}
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Description
          </h2>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
            {currentTask.description}
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                getTopicColor(currentTask.topic)
              )}
            >
              {currentTask.topic}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-gray-200">
              {currentTask.subject}
            </span>
          </div>
        </div>

        {/* Task details horizontal layout */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-200 dark:border-zinc-700">
          {/* Task Owner */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Task Owner
            </h3>
            <div className="flex items-center">
              {currentTask.owner.profilePic ? (
                <img
                  src={currentTask.owner.profilePic}
                  alt={currentTask.owner.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-zinc-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  {currentTask.owner.name.charAt(0)}
                </div>
              )}
              <div className="ml-4">
                <p className="font-medium text-gray-800 dark:text-white">
                  {currentTask.owner.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Task Owner
                </p>
              </div>
            </div>
          </div>

          {/* Created and Deadline */}
          <div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-2">
              Created
            </h3>
            <div className="flex items-center mb-4">
              <Calendar
                size={16}
                className="mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400"
              />
              <p className="font-medium text-gray-800 dark:text-white">
                {formatDate(currentTask.dateCreated)}
              </p>
            </div>

            <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-2">
              Deadline
            </h3>
            <div className="flex items-center">
              <Clock
                size={16}
                className="mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400"
              />
              <p className="font-medium text-gray-800 dark:text-white">
                {formatDate(currentTask.deadline)}
              </p>
            </div>
          </div>

          {/* Budget */}
          <div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-2">
              Budget
            </h3>
            <div className="flex items-center">
              <DollarSign
                size={16}
                className="mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400"
              />
              <p className="font-medium text-gray-800 dark:text-white text-xl">
                ${currentTask.budget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="p-6 flex justify-center md:justify-end">
          <button
            onClick={handleTaskToggle}
            className={`px-6 py-3 rounded-md text-white font-medium ${
              isAssigned
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            {isAssigned ? "Remove this task" : "Accept this task"}
          </button>
        </div>
      </div>
    </div>
  );
}
