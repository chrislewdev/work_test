// app/userdashboard/tasks/[id]/client.tsx

"use client";

import React from "react";
import TaskDetailContent from "@/components/dashboard/TaskDetailContent";

interface TaskDetailPageClientProps {
  taskId: string;
}

export default function TaskDetailPageClient({
  taskId,
}: TaskDetailPageClientProps) {
  return <TaskDetailContent taskId={taskId} />;
}
