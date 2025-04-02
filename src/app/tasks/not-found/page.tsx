// app/tasks/not-found.tsx

import Link from "next/link";
import { Container } from "@/components/ui_blocks/Container";
import Header from "@/components/header/Header";

export default function TaskNotFound() {
  return (
    <>
      <Header />
      <Container className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
          Task Not Found
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-md">
          Sorry, the task you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/tasks"
          className="rounded-md bg-rose-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500"
        >
          View Available Tasks
        </Link>
      </Container>
    </>
  );
}
