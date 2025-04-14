// src/app/userdashboard/tasks/[id]/page.tsx

import { Metadata } from "next";
import TaskDetailPageClient from "./client";

export const metadata: Metadata = {
  title: "Task Details | User Dashboard",
  description: "View and manage task details",
};

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Await the params object to resolve
  const resolvedParams = await Promise.resolve(params);

  return <TaskDetailPageClient taskId={resolvedParams.id} />;
}
