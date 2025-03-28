// src/components/dashboard/TaskCard.tsx

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/userdashboard/tasks/${task.id}`);
  };

  // Format the deadline date without using date-fns
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return dateString;
      }

      // Format as "MMM D, YYYY" (e.g., "Mar 15, 2023")
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = months[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      return `${month} ${day}, ${year}`;
    } catch (error) {
      return dateString;
    }
  };

  // Get topic color based on topic name
  const getTopicColor = (topic: string) => {
    const topicColors: Record<string, string> = {
      "Social Media": "bg-blue-100 text-blue-800",
      "Product Review": "bg-purple-100 text-purple-800",
      TikTok: "bg-pink-100 text-pink-800",
      YouTube: "bg-red-100 text-red-800",
      LinkedIn: "bg-blue-200 text-blue-900",
      "Live Stream": "bg-green-100 text-green-800",
      Photography: "bg-amber-100 text-amber-800",
      "Content Writing": "bg-indigo-100 text-indigo-800",
      Pinterest: "bg-red-100 text-red-800",
      Podcast: "bg-violet-100 text-violet-800",
      "Video Production": "bg-orange-100 text-orange-800",
      "Web Development": "bg-cyan-100 text-cyan-800",
    };

    return topicColors[topic] || "bg-gray-100 text-gray-800";
  };

  return (
    <div
      className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 p-4 flex flex-col h-40 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
        {task.title}
      </h3>
      <div className="mt-auto pt-2 flex flex-col gap-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Due: {formatDate(task.deadline)}
        </div>
        <div
          className={cn(
            "text-xs px-2 py-1 rounded-full w-fit",
            getTopicColor(task.topic)
          )}
        >
          {task.topic}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
