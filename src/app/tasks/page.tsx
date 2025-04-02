// app/tasks/page.tsx

import React from "react";
import TasksClientPage from "./client-page";

export const metadata = {
  title: "Available Tasks",
  description: "View and accept available tasks",
};

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await Promise.resolve(searchParams);
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;

  return <TasksClientPage initialPage={page} />;
}
