// app/tasks/[id]/client-page.tsx

"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui_blocks/Container";
import { formatDate, formatRelativeTime } from "@/app/lib/formatDate";
import { calculatePriority } from "@/app/lib/calculatePriority";
import BackButton from "@/components/ui_blocks/BackButton";
import Header from "@/components/header/Header";
import useTaskStore from "@/stores/taskStore";

interface TaskDetailClientPageProps {
  taskId: string;
}

export default function TaskDetailClientPage({
  taskId,
}: TaskDetailClientPageProps) {
  const { currentTask, loading, error, fetchTaskById } = useTaskStore();

  // Fetch task when component mounts
  useEffect(() => {
    fetchTaskById(taskId);
  }, [fetchTaskById, taskId]);

  // Determine the priority color
  const getPriorityColor = (deadline: string) => {
    const priority = calculatePriority(deadline);
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    };
    return colors[priority];
  };

  return (
    <>
      <Header />
      <Container className="mt-16 lg:mt-32">
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Loading task details...
            </p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Task details */}
        {!loading && currentTask && (
          <div className="xl:relative">
            <div className="mx-auto max-w-2xl">
              <div className="mb-8">
                <BackButton />
              </div>

              <article>
                <header className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <time
                      dateTime={currentTask.dateCreated}
                      className="text-base text-zinc-500 dark:text-zinc-400"
                    >
                      Posted on {formatDate(currentTask.dateCreated)}
                    </time>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${getPriorityColor(
                        currentTask.deadline
                      )}`}
                    >
                      {calculatePriority(currentTask.deadline)
                        .charAt(0)
                        .toUpperCase() +
                        calculatePriority(currentTask.deadline).slice(1)}{" "}
                      Priority
                    </span>
                  </div>

                  <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                    {currentTask.title}
                  </h1>

                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={currentTask.owner.profilePic}
                        alt={currentTask.owner.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
                        {currentTask.owner.name}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Task Owner
                      </p>
                    </div>
                  </div>
                </header>

                <div className="mt-8 prose dark:prose-invert max-w-none">
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    {currentTask.description}
                  </p>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        Task Details
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Topic:
                          </span>{" "}
                          <span className="text-zinc-700 dark:text-zinc-300">
                            {currentTask.topic}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Subject:
                          </span>{" "}
                          <span className="text-zinc-700 dark:text-zinc-300">
                            {currentTask.subject}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Date Created:
                          </span>{" "}
                          <span className="text-zinc-700 dark:text-zinc-300">
                            {formatDate(currentTask.dateCreated)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        Deadline & Budget
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Deadline:
                          </span>{" "}
                          <span className="text-zinc-700 dark:text-zinc-300">
                            {formatDate(currentTask.deadline)}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Budget:
                          </span>{" "}
                          <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                            ${currentTask.budget}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-center">
                  <button className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-8 rounded-md transition-colors text-lg w-full md:w-auto md:min-w-[200px]">
                    Accept This Task
                  </button>
                </div>
              </article>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
