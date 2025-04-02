// components/tasks/TaskCard.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, formatRelativeTime } from "@/app/lib/formatDate";
import { calculatePriority } from "@/app/lib/calculatePriority";
import { Task } from "@/stores/taskStore";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // Determine the priority dynamically based on deadline
  const calculatedPriority = calculatePriority(task.deadline);

  // Determine the priority color
  const priorityColor = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <div className="h-[480px] rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40 flex flex-col">
      <div className="flex-grow overflow-hidden">
        {/* Task date */}
        <div className="flex justify-between items-center mb-2">
          <time
            dateTime={task.dateCreated}
            className="text-sm text-zinc-500 dark:text-zinc-400"
          >
            {formatDate(task.dateCreated)}
          </time>
          <span
            className={`text-xs px-2 py-1 rounded-full ${priorityColor[calculatedPriority]}`}
          >
            {calculatedPriority.charAt(0).toUpperCase() +
              calculatedPriority.slice(1)}
          </span>
        </div>

        {/* Task title */}
        <h2 className="mt-1 text-xl font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-2">
          <Link href={`/tasks/${task.id}`} className="hover:underline">
            {task.title}
          </Link>
        </h2>

        {/* Task description */}
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 line-clamp-3">
          {task.description}
        </p>

        {/* Task details */}
        <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-2">
          <div className="col-span-2">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Topic:
            </span>{" "}
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {task.topic}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Subject:
            </span>{" "}
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              {task.subject}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Budget:
            </span>{" "}
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              ${task.budget}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Deadline:
            </span>{" "}
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              {formatDate(task.deadline)}
            </span>
          </div>
        </div>
      </div>

      {/* Task owner */}
      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-700/40 flex items-center">
        <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
          <Image
            src={task.owner.profilePic}
            alt={task.owner.name}
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
            {task.owner.name}
          </p>
        </div>
      </div>

      {/* Action button */}
      <div className="mt-4">
        <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
