// app/tasks/[id]/edit/page.tsx

import React from "react";
import EditTaskClientPage from "./client-page";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Edit Task",
  description: "Edit an existing task",
};

interface EditTaskPageProps {
  params: {
    id: string;
  };
}

export default function EditTaskPage({ params }: EditTaskPageProps) {
  return (
    <>
      <Header />
      <EditTaskClientPage taskId={params.id} />
    </>
  );
}
