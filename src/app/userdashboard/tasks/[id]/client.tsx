// app/userdashboard/tasks/[id]/client.tsx

"use client";

import React from "react";
import TaskDetailContent from "@/components/dashboard/TaskDetailContent";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";
import useTaskStore from "@/stores/taskStore";

interface TaskDetailPageClientProps {
  taskId: string;
}

export default function TaskDetailPageClient({
  taskId,
}: TaskDetailPageClientProps) {
  const { resetState } = useTaskStore();

  // Reset task detail state on component unmount
  useResetOnUnmount(resetState.taskDetail);

  return <TaskDetailContent taskId={taskId} />;
}
