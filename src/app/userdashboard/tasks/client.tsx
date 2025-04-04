// src/app/userdashboard/tasks/client.tsx

"use client";

import React, { useEffect } from "react";
import TaskManagementContent from "@/components/dashboard/TaskManagementContent";
import useTaskStore from "@/stores/taskStore";
import { useSearchParams } from "next/navigation";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

export default function TasksPageClient() {
  const { setSortOption, resetState } = useTaskStore();
  const searchParams = useSearchParams();

  // Reset task list state on component unmount - consistent pattern
  useResetOnUnmount(resetState.taskList);

  // Apply sort option from URL if available
  useEffect(() => {
    // Reset list state before applying new sorting - consistent pattern
    resetState.taskList({ preserve: true });

    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSortOption(sortParam as any);
    }
  }, [searchParams, setSortOption, resetState]);

  return <TaskManagementContent />;
}
