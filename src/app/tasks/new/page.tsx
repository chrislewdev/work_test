// app/tasks/new/page.tsx

import React from "react";
import Header from "@/components/header/Header";
import NewTaskClientPage from "./client-page";

export const metadata = {
  title: "Create New Task",
  description: "Create a new task for influencers",
};

export default function NewTaskPage() {
  return (
    <>
      <Header />
      <NewTaskClientPage />
    </>
  );
}
