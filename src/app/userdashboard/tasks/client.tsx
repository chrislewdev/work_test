// app/userdashboard/tasks/client.tsx

"use client";

import React, { useEffect } from "react";
import TaskManagementContent from "@/components/dashboard/TaskManagementContent";
import useTaskStore from "@/stores/taskStore";
import { useSearchParams } from "next/navigation";

/**
 * Client component for dashboard tasks page with filter and sort capabilities
 */
export default function TasksPageClient() {
  const { setSortOption } = useTaskStore();
  const searchParams = useSearchParams();

  // Apply sort option from URL if available
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSortOption(sortParam as any);
    }
  }, [searchParams, setSortOption]);

  return <TaskManagementContent />;
}
