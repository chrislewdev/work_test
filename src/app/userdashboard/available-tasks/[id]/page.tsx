// src/app/userdashboard/available-tasks/[id]/page.tsx

import { Metadata } from "next";
import TaskDetailPageClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: "Task Details | User Dashboard",
    description: "View task details and accept it if interested",
  };
}

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  return <TaskDetailPageClient taskId={params.id} />;
}
