// app/userdashboard/tasks/page.tsx

import React from "react";
import TaskManagementContent from "@/components/dashboard/TaskManagementContent";

export const metadata = {
  title: "Task Management",
  description: "Manage your tasks and projects",
};

export default function TasksPage() {
  return <TaskManagementContent />;
}
