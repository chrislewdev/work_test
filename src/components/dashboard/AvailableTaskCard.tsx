// src/components/dashboard/AvailableTaskCard.tsx

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Task } from "@/types/task";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { formatDate, formatRelativeTime } from "@/app/lib/formatDate";
import { calculatePriority } from "@/app/lib/calculatePriority";

interface AvailableTaskCardProps {
  task: Task;
  compact?: boolean;
}

const AvailableTaskCard: React.FC<AvailableTaskCardProps> = ({
  task,
  compact = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/userdashboard/available-tasks/${task.id}`);
  };

  // Calculate priority based on deadline
  const priority = calculatePriority(task.deadline);

  // Get topic color based on topic name
  const getTopicColor = (topic: string) => {
    const topicColors: Record<string, string> = {
      "Social Media":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Product Review":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      TikTok:
        "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      YouTube: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      LinkedIn:
        "bg-blue-200 text-blue-900 dark:bg-blue-900/40 dark:text-blue-300",
      "Live Stream":
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      Photography:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      "Content Writing":
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      Pinterest: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      Podcast:
        "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
      "Video Production":
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      "Web Development":
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    };

    return (
      topicColors[topic] ||
      "bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-300"
    );
  };

  // Get priority color based on priority level
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-300";
    }
  };

  return (
    <div
      className="bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col cursor-pointer w-full h-[280px]"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-3">
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            getTopicColor(task.topic)
          )}
        >
          {task.topic}
        </span>
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            getPriorityColor(priority)
          )}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
        {task.title}
      </h3>

      {!compact && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="mt-auto space-y-2">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="mr-1.5 h-4 w-4" />
          <span>{formatRelativeTime(task.deadline)}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="mr-1.5 h-4 w-4" />
          <span>{formatDate(task.deadline)}</span>
        </div>

        <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
          <DollarSign className="mr-1.5 h-4 w-4" />
          <span>${task.budget.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-700 flex items-center">
        <div className="flex-shrink-0 h-6 w-6 rounded-full overflow-hidden mr-2">
          {task.owner.profilePic ? (
            <img
              src={task.owner.profilePic}
              alt={task.owner.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {task.owner.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {task.owner.name}
        </span>
      </div>
    </div>
  );
};

export default AvailableTaskCard;
