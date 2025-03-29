// src/components/dashboard/TaskManagementContent.tsx
/**
 * This component displays a Kanban-style task board with To Do, In Progress, and Completed columns.
 * It directly imports task data from src/app/lib/userTaskData.json.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import TaskCard from "./TaskCard";
import TaskSkeleton from "./TaskSkeleton";
import { ChevronRight } from "lucide-react";
import { Task } from "@/types/task";
// Direct import of task data
import taskData from "@/app/lib/userTaskData.json";

// Different page sizes based on screen size
const DESKTOP_ITEMS_PER_PAGE = 12; // 3 columns x 4 rows
const MOBILE_ITEMS_PER_PAGE = 4; // 4 items for mobile view

const TaskManagementContent: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();

  // Load task data with a simulated loading delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(taskData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if URL has a tab parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get("tab");
    if (tab && ["all", "todo", "inprogress", "completed"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [pathname]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);

    // Update URL with the tab
    router.push(`/userdashboard/tasks?tab=${tab}`, { scroll: false });
  };

  // Filter tasks based on status
  const todoTasks = tasks.filter((task) => task.status === "to do");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  // State to track screen size
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };

    // Check on initial load
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Calculate pagination based on screen size
  const getPaginatedTasks = (taskList: Task[]) => {
    const itemsPerPage = isMobile
      ? MOBILE_ITEMS_PER_PAGE
      : DESKTOP_ITEMS_PER_PAGE;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return taskList.slice(startIndex, startIndex + itemsPerPage);
  };

  // Get tasks based on active tab
  const getTasksForActiveTab = () => {
    switch (activeTab) {
      case "todo":
        return getPaginatedTasks(todoTasks);
      case "inprogress":
        return getPaginatedTasks(inProgressTasks);
      case "completed":
        return getPaginatedTasks(completedTasks);
      default:
        return [];
    }
  };

  // Calculate total pages - ensures at least 1 page even if empty
  // Now accounts for different page sizes on mobile vs desktop
  const getTotalPages = () => {
    let total;
    switch (activeTab) {
      case "todo":
        total = todoTasks.length;
        break;
      case "inprogress":
        total = inProgressTasks.length;
        break;
      case "completed":
        total = completedTasks.length;
        break;
      default:
        total = 0;
    }

    const itemsPerPage = isMobile
      ? MOBILE_ITEMS_PER_PAGE
      : DESKTOP_ITEMS_PER_PAGE;
    return Math.max(1, Math.ceil(total / itemsPerPage));
  };

  // Render pagination - with fixed position for navigation buttons and max 5 page numbers on desktop
  const renderPagination = () => {
    const totalPages = getTotalPages();

    // Function to determine which page numbers to show
    const getVisiblePageNumbers = () => {
      // On mobile, show limited page numbers (max 3)
      if (isMobile) {
        // Determine which page numbers to show (current, previous, next)
        const pageNumbers = new Set<number>();

        // Always add current page
        pageNumbers.add(currentPage);

        // Add previous page if it exists
        if (currentPage > 1) {
          pageNumbers.add(currentPage - 1);
        }

        // Add next page if it exists
        if (currentPage < totalPages) {
          pageNumbers.add(currentPage + 1);
        }

        // Convert to array and sort
        return Array.from(pageNumbers).sort((a, b) => a - b);
      }

      // On desktop, show max 5 page numbers
      // Strategy: Show current page in the middle when possible, with 2 pages before and 2 after
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + 4);

      // Adjust start if we hit the upper limit
      if (end === totalPages) {
        start = Math.max(1, end - 4);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePageNumbers = getVisiblePageNumbers();
    const pageNumbersContainerWidth = isMobile ? "120px" : "200px";

    return (
      <div className="mt-6 flex justify-center">
        <nav className="flex items-center">
          {/* Previous button - fixed width */}
          <div className="w-20">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
            >
              Previous
            </button>
          </div>

          {/* Page numbers container - fixed width */}
          <div
            className="flex items-center justify-center"
            style={{ width: pageNumbersContainerWidth }}
          >
            {visiblePageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 mx-1 flex items-center justify-center rounded-md text-sm font-medium ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next button - fixed width */}
          <div className="w-20 text-right">
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, getTotalPages()))
              }
              disabled={currentPage === getTotalPages()}
              className="px-3 py-1 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    );
  };

  // Array of tab data for easy mapping
  const tabData = [
    {
      id: "all",
      label: "All Tasks",
      count: tasks.length,
    },
    {
      id: "todo",
      label: "To Do",
      count: todoTasks.length,
    },
    {
      id: "inprogress",
      label: "In Progress",
      count: inProgressTasks.length,
    },
    {
      id: "completed",
      label: "Completed",
      count: completedTasks.length,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 dark:border-zinc-700">
          {/* Mobile view: 2x2 grid layout */}
          <div className="grid grid-cols-2 md:hidden">
            {tabData.map((tab) => (
              <button
                key={tab.id}
                className={`px-3 py-3 text-sm font-medium flex flex-col items-center justify-center ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                <div className="flex items-center">
                  {tab.label}{" "}
                  <span className="ml-1 rounded-full bg-gray-100 dark:bg-zinc-700 px-2 py-0.5 text-xs">
                    {isLoading ? "..." : tab.count}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Desktop view: horizontal tabs (unchanged) */}
          <div className="hidden md:flex overflow-x-auto">
            {tabData.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}{" "}
                <span className="ml-1 rounded-full bg-gray-100 dark:bg-zinc-700 px-2 py-0.5 text-xs">
                  {isLoading ? "..." : tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* All Tasks View (Kanban-style) */}
        {activeTab === "all" && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* To Do Column */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                    To Do
                  </h2>
                  <span className="rounded-full bg-gray-100 dark:bg-zinc-700 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                    {isLoading ? "..." : todoTasks.length}
                  </span>
                </div>
                <div className="space-y-3" style={{ minHeight: "580px" }}>
                  {isLoading ? (
                    <TaskSkeleton count={4} />
                  ) : (
                    <>
                      {todoTasks.slice(0, 4).map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                      {todoTasks.length > 4 && (
                        <button
                          onClick={() => handleTabChange("todo")}
                          className="mt-2 w-full flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          <span>View more</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* In Progress Column */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                    In Progress
                  </h2>
                  <span className="rounded-full bg-gray-100 dark:bg-zinc-700 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                    {isLoading ? "..." : inProgressTasks.length}
                  </span>
                </div>
                <div className="space-y-3" style={{ minHeight: "580px" }}>
                  {isLoading ? (
                    <TaskSkeleton count={4} />
                  ) : (
                    <>
                      {inProgressTasks.slice(0, 4).map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                      {inProgressTasks.length > 4 && (
                        <button
                          onClick={() => handleTabChange("inprogress")}
                          className="mt-2 w-full flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          <span>View more</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Completed Column */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
                    Completed
                  </h2>
                  <span className="rounded-full bg-gray-100 dark:bg-zinc-700 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                    {isLoading ? "..." : completedTasks.length}
                  </span>
                </div>
                <div className="space-y-3" style={{ minHeight: "580px" }}>
                  {isLoading ? (
                    <TaskSkeleton count={4} />
                  ) : (
                    <>
                      {completedTasks.slice(0, 4).map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                      {completedTasks.length > 4 && (
                        <button
                          onClick={() => handleTabChange("completed")}
                          className="mt-2 w-full flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          <span>View more</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Specific Tab Views (with pagination) */}
        {activeTab !== "all" && (
          <div className="p-6 flex flex-col">
            {/* Fixed height container for task cards */}
            <div style={{ height: "680px", position: "relative" }}>
              {/* Task grid that doesn't flex to fill space */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 content-start"
                style={{ gridAutoRows: "160px" }}
              >
                {isLoading ? (
                  <TaskSkeleton count={12} />
                ) : getTasksForActiveTab().length > 0 ? (
                  getTasksForActiveTab().map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                ) : (
                  <div className="col-span-3 flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
                    No tasks found in this category
                  </div>
                )}
              </div>
            </div>

            {/* Pagination - fixed position at the bottom */}
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagementContent;
