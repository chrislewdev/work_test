// src/app/userdashboard/available-tasks/page.tsx

import { Metadata } from "next";
import AvailableTasksClientPage from "./client-page";

export const metadata: Metadata = {
  title: "Available Tasks | User Dashboard",
  description: "Browse and accept available tasks for influencers",
};

export default function AvailableTasksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;

  return <AvailableTasksClientPage initialPage={params} />;
}
