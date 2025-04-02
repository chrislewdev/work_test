// app/userdashboard/tasks/[id]/page.tsx

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
  return <TaskDetailPageClient taskId={params.id} />;
}
