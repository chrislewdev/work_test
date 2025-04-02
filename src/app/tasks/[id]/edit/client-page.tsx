// app/tasks/[id]/edit/client-page.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui_blocks/Container";
import BackButton from "@/components/ui_blocks/BackButton";
import TaskForm from "@/components/tasks/TaskForm";
import useTaskStore from "@/stores/taskStore";

interface EditTaskClientPageProps {
  taskId: string;
}

export default function EditTaskClientPage({
  taskId,
}: EditTaskClientPageProps) {
  const router = useRouter();
  const { currentTask, fetchTaskById, loading, error } = useTaskStore();

  // Fetch task data when component mounts
  useEffect(() => {
    fetchTaskById(taskId);
  }, [fetchTaskById, taskId]);

  // Handle cancel button click
  const handleCancel = () => {
    router.back();
  };

  // Handle success
  const handleSuccess = () => {
    // Navigate back to task details
    setTimeout(() => {
      router.push(`/tasks/${taskId}`);
    }, 1500); // Match the delay in TaskForm
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
          Edit Task
        </h1>

        <TaskForm
          mode="edit"
          taskId={taskId}
          initialData={currentTask}
          onCancel={handleCancel}
          onSuccess={handleSuccess}
        />
      </div>
    </Container>
  );
}
