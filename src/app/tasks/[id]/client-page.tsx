// src/app/tasks/[id]/client-page.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui_blocks/Container";
import BackButton from "@/components/ui_blocks/BackButton";
import useTaskStore from "@/stores/taskStore";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

interface TaskDetailPageProps {
  taskId: string;
}

export default function TaskDetailClientPage({ taskId }: TaskDetailPageProps) {
  const router = useRouter();
  const { currentTask, fetchTaskById, taskDetailState, resetState } =
    useTaskStore();
  const { loading, error } = taskDetailState;

  // Reset detail state on component unmount - consistent pattern
  useResetOnUnmount(resetState.taskDetail);

  // Fetch task data when component mounts
  useEffect(() => {
    // Reset detail state before fetching to ensure clean slate - consistent pattern
    resetState.taskDetail();
    fetchTaskById(taskId);
  }, [fetchTaskById, taskId, resetState]);

  // Handle cancel button click
  const handleCancel = () => {
    router.back();
  };

  // Show loading state while fetching task
  if (loading && !currentTask) {
    return (
      <Container className="mt-16 lg:mt-32">
        <div className="mb-8">
          <BackButton />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Loading task data...
            </p>
          </div>
        </div>
      </Container>
    );
  }

  // Show error state
  if (error || !currentTask) {
    return (
      <Container className="mt-16 lg:mt-32">
        <div className="mb-8">
          <BackButton />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            <p>{error || "Task not found"}</p>
          </div>
          <button
            onClick={() => router.push("/tasks")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Tasks
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="mb-8">
        <BackButton />
      </div>

      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 mb-8">
          Task Details
        </h1>

        {/* Task details content */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{currentTask.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {currentTask.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Topic</p>
              <p className="font-medium">{currentTask.topic}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Subject
              </p>
              <p className="font-medium">{currentTask.subject}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Deadline
              </p>
              <p className="font-medium">
                {new Date(currentTask.deadline).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
              <p className="font-medium">${currentTask.budget}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none dark:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-600"
            >
              Back
            </button>
            <button
              onClick={() => router.push(`/tasks/${taskId}/edit`)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Edit Task
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
