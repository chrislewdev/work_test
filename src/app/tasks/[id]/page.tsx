// app/tasks/[id]/page.tsx

import React from "react";
import TaskDetailClientPage from "./client-page";
import { taskService } from "@/services/taskService";
import { notFound } from "next/navigation";

interface TaskDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: TaskDetailPageProps) {
  try {
    const task = await taskService.fetchTaskById(params.id);

    if (!task) {
      return {
        title: "Task Not Found",
        description: "The requested task could not be found.",
      };
    }

    return {
      title: task.title,
      description: task.description,
    };
  } catch (error) {
    return {
      title: "Task Not Found",
      description: "The requested task could not be found.",
    };
  }
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  try {
    // Pre-fetch task data for SEO
    await taskService.fetchTaskById(params.id);

    return <TaskDetailClientPage taskId={params.id} />;
  } catch (error) {
    notFound();
  }
}
