// src/app/userdashboard/available-tasks/[id]/page.tsx

import { Metadata } from "next";
import TaskDetailPageClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Use the params to create a dynamic title
  const taskId = params.id;

  return {
    title: `Task #${taskId} | User Dashboard`,
    description: "View task details and accept it if interested",
  };
}

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Await the params object to resolve
  const resolvedParams = await Promise.resolve(params);

  return <TaskDetailPageClient taskId={resolvedParams.id} />;
}
