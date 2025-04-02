// app/tasks/new/client-page.tsx

"use client";

import React from "react";
import { Container } from "@/components/ui_blocks/Container";
import BackButton from "@/components/ui_blocks/BackButton";
import TaskForm from "@/components/tasks/TaskForm";
import { Task } from "@/stores/taskStore";

export default function NewTaskClientPage() {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="mb-8">
        <BackButton />
      </div>

      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 mb-8">
          Create New Task
        </h1>

        <TaskForm
          mode="create"
          redirectPath="/tasks"
          initialData={{
            dateCreated: new Date().toISOString().split("T")[0],
          }}
        />
      </div>
    </Container>
  );
}
