// components/dashboard/TaskDetailContent.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronDown,
  Paperclip,
  Plus,
  Calendar,
  Clock,
  DollarSign,
  BookOpen,
} from "lucide-react";
import { Task } from "@/types/task";
import { cn } from "@/app/lib/utils";

import taskData from "@/app/lib/userTaskData.json";

interface TaskDetailContentProps {
  taskId: string;
}

export default function TaskDetailContent({ taskId }: TaskDetailContentProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string>("");
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [isAssignedToUser, setIsAssignedToUser] = useState(false); // Track if task is assigned to current user

  // The back path is always the dashboard tasks page
  const backPath = "/userdashboard/tasks";

  useEffect(() => {
    // Simulate API call with a slight delay
    const timer = setTimeout(() => {
      const foundTask = taskData.find((t) => t.id === taskId);
      if (foundTask) {
        // Ensure the task status conforms to the TaskStatus type
        const validStatus = foundTask.status as
          | "to do"
          | "in progress"
          | "completed";
        // Set task with properly typed status
        setTask({
          ...foundTask,
          status: validStatus,
        });
        setStatus(validStatus);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [taskId]);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

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

  // Handle task assignment/removal
  const handleTaskAssignment = () => {
    setIsAssignedToUser(!isAssignedToUser);
    // In a real app, you would save this to your backend
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="flex items-center space-x-3">
          <div className="h-5 w-5 bg-gray-200 dark:bg-zinc-700 rounded"></div>
          <div className="h-6 w-40 bg-gray-200 dark:bg-zinc-700 rounded"></div>
        </div>
        <div className="h-12 w-full bg-gray-200 dark:bg-zinc-700 rounded"></div>
        <div className="h-40 w-full bg-gray-200 dark:bg-zinc-700 rounded"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Task Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          The task you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href={backPath}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft size={16} className="mr-2" />
          Back to Tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back to tasks link */}
      <Link
        href={backPath}
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-4"
      >
        <ChevronLeft size={16} className="mr-1" />
        Back to Tasks
      </Link>

      {/* Main content area with two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column - Main content */}
        <div className="lg:w-2/3 space-y-6">
          {/* Task header with status dropdown */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {task.title}
              </h1>
              <div>
                <span
                  className={cn(
                    "inline-flex items-center px-4 py-2 rounded-md text-sm font-medium",
                    status === "to do"
                      ? "bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200"
                      : status === "in progress"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : status === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200"
                  )}
                >
                  {status === "to do"
                    ? "To Do"
                    : status === "in progress"
                    ? "In Progress"
                    : status === "completed"
                    ? "Completed"
                    : "Unknown"}
                </span>
              </div>
            </div>

            {/* Task description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                {task.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    getTopicColor(task.topic)
                  )}
                >
                  {task.topic}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-gray-200">
                  {task.subject}
                </span>
              </div>
            </div>
          </div>

          {/* Attachments section */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Paperclip size={18} className="mr-2" />
              Attachments
            </h2>

            {/* Placeholder for file upload */}
            <div className="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-lg p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                <Plus size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Maximum file size: 10MB
              </p>

              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Add Files
              </button>
            </div>
          </div>

          {/* Activity/Comments section */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Activity
            </h2>

            {/* Comment input */}
            <div className="flex gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400">
                U
              </div>
              <div className="flex-grow">
                <textarea
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 dark:border-zinc-700 rounded-md p-3 text-gray-800 dark:text-white bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  rows={3}
                />
                <div className="mt-2 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Comment
                  </button>
                </div>
              </div>
            </div>

            {/* No activity message */}
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No activity yet. Be the first to comment!
              </p>
            </div>
          </div>
        </div>

        {/* Right column - Details */}
        <div className="lg:w-1/3 space-y-6">
          {/* Task owner card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Task Owner
            </h2>
            <div className="flex items-center">
              {task.owner.profilePic ? (
                <img
                  src={task.owner.profilePic}
                  alt={task.owner.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-zinc-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  {task.owner.name.charAt(0)}
                </div>
              )}
              <div className="ml-4">
                <p className="font-medium text-gray-800 dark:text-white">
                  {task.owner.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ID: {task.owner.id}
                </p>
              </div>
            </div>
          </div>

          {/* Details card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between"
              onClick={() => setDetailsOpen(!detailsOpen)}
            >
              <div className="flex items-center">
                <BookOpen
                  size={18}
                  className="mr-2 text-gray-500 dark:text-gray-400"
                />
                <span className="font-medium text-gray-800 dark:text-white">
                  Details
                </span>
              </div>
              <ChevronDown
                size={18}
                className={cn(
                  "text-gray-500 dark:text-gray-400 transition-transform",
                  detailsOpen ? "transform rotate-180" : ""
                )}
              />
            </button>
            {detailsOpen && (
              <div className="px-6 pb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Assignee
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white mt-1">
                      None
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Calendar
                      size={16}
                      className="mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Created
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {formatDate(task.dateCreated)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock
                      size={16}
                      className="mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Deadline
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {formatDate(task.deadline)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign
                      size={16}
                      className="mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400"
                    />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Budget
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        ${task.budget.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Task assignment action card */}
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6">
            {isAssignedToUser && (
              <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors mb-4">
                Submit for Review
              </button>
            )}
            <button
              onClick={handleTaskAssignment}
              className={`w-full px-4 py-2 ${
                isAssignedToUser
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white rounded-md transition-colors`}
            >
              {isAssignedToUser ? "Remove this task" : "Accept this task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
