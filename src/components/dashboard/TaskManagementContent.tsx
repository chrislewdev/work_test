// src/components/dashboard/TaskManagementContent.tsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import TaskCard from "./TaskCard";
import TaskSkeleton from "./TaskSkeleton";
import { ChevronRight } from "lucide-react";
import { Task } from "@/types/task";
import { FunnelIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import useTaskStore, { TaskSortOption } from "@/stores/taskStore";
import FilterPanel from "@/components/tasks/FilterPanel";
import ActiveFilters from "@/components/tasks/ActiveFilters";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

// Different page sizes based on screen size
const DESKTOP_ITEMS_PER_PAGE = 12; // 3 columns x 4 rows
const MOBILE_ITEMS_PER_PAGE = 4; // 4 items for mobile view

const TaskManagementContent: React.FC = () => {
  const {
    tasks,
    filteredTasks,
    taskListState, // Use taskListState instead of direct loading/error
    fetchTasks,
    sortBy,
    setSortOption,
    filters,
    activeFilterCount,
    resetState,
  } = useTaskStore();

  // Destructure loading and error from taskListState
  const { loading, error } = taskListState;

  // Reset task list state on component unmount - consistent pattern
  useResetOnUnmount(resetState.taskList);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for current page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // State for sort dropdown visibility
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  // State for filter panel visibility
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  // Last active filter count for tracking changes
  const [lastFilterCount, setLastFilterCount] = useState(activeFilterCount);
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("all");
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

  // Check if URL has a tab parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab &&
      ["all", "todo", "inprogress", "pendingreview", "completed"].includes(tab)
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Fetch tasks on component mount
  useEffect(() => {
    // Reset task list state before fetching to ensure clean slate - consistent pattern
    resetState.taskList();
    fetchTasks();
  }, [fetchTasks, resetState]);

  // Track filter changes and reset pagination
  useEffect(() => {
    // Only react to actual changes in the filter count
    if (activeFilterCount !== lastFilterCount) {
      setLastFilterCount(activeFilterCount);
      setCurrentPage(1);
    }
  }, [activeFilterCount, lastFilterCount]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);

    // Update URL with the tab
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Filter tasks based on status
  const todoTasks = filteredTasks.filter((task) => task.status === "to do");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in progress"
  );
  // Add new filter for pending review tasks
  const pendingReviewTasks = filteredTasks.filter(
    (task) => task.status === "pending review"
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "completed"
  );

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
      case "pendingreview":
        return getPaginatedTasks(pendingReviewTasks);
      case "completed":
        return getPaginatedTasks(completedTasks);
      default:
        return [];
    }
  };

  // Calculate total pages - ensures at least 1 page even if empty
  const getTotalPages = () => {
    let total;
    switch (activeTab) {
      case "todo":
        total = todoTasks.length;
        break;
      case "inprogress":
        total = inProgressTasks.length;
        break;
      case "pendingreview":
        total = pendingReviewTasks.length;
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

  // Handle sort selection
  const handleSortChange = (option: TaskSortOption) => {
    setSortOption(option);
    setShowSortDropdown(false);
    // Reset to first page when sorting changes
    resetPage();
  };

  // Reset page function to pass to filter components
  const resetPage = () => {
    setCurrentPage(1);
  };

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  // Get sort option display text
  const getSortDisplayText = (option: TaskSortOption) => {
    switch (option) {
      case "deadline-asc":
        return "Deadline (Earliest First)";
      case "deadline-desc":
        return "Deadline (Latest First)";
      case "budget-asc":
        return "Budget (Low to High)";
      case "budget-desc":
        return "Budget (High to Low)";
      case "date-created-asc":
        return "Date Created (Oldest First)";
      case "date-created-desc":
        return "Date Created (Newest First)";
      default:
        return "Sort Tasks";
    }
  };

  // Array of tab data for easy mapping
  const tabData = [
    {
      id: "all",
      label: "All Tasks",
      count: filteredTasks.length,
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
      id: "pendingreview",
      label: "Pending Review",
      count: pendingReviewTasks.length,
    },
    {
      id: "completed",
      label: "Completed",
      count: completedTasks.length,
    },
  ];

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showSortDropdown && !target.closest("[data-sort-dropdown]")) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  // Render pagination with fixed position for navigation buttons
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

  return (
    <div className="space-y-6">
      {/* Filtering and sorting controls */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Task Management
        </h1>
        <div className="flex items-center gap-3">
          {/* Filter button */}
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700"
            onClick={toggleFilterPanel}
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-blue-600 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort dropdown */}
          <div className="relative" data-sort-dropdown>
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700"
              onClick={(e) => {
                e.stopPropagation();
                setShowSortDropdown(!showSortDropdown);
              }}
            >
              <ArrowsUpDownIcon className="h-4 w-4" />
              <span className="hidden sm:inline">
                {getSortDisplayText(sortBy)}
              </span>
              <span className="sm:hidden">Sort</span>
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:ring-zinc-700">
                <div className="py-1">
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      sortBy === "deadline-asc"
                        ? "bg-gray-100 text-gray-900 dark:bg-zinc-700 dark:text-zinc-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSortChange("deadline-asc");
                    }}
                  >
                    Deadline (Earliest First)
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      sortBy === "deadline-desc"
                        ? "bg-gray-100 text-gray-900 dark:bg-zinc-700 dark:text-zinc-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSortChange("deadline-desc");
                    }}
                  >
                    Deadline (Latest First)
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      sortBy === "budget-desc"
                        ? "bg-gray-100 text-gray-900 dark:bg-zinc-700 dark:text-zinc-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSortChange("budget-desc");
                    }}
                  >
                    Budget (High to Low)
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      sortBy === "budget-asc"
                        ? "bg-gray-100 text-gray-900 dark:bg-zinc-700 dark:text-zinc-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSortChange("budget-asc");
                    }}
                  >
                    Budget (Low to High)
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      sortBy === "date-created-desc"
                        ? "bg-gray-100 text-gray-900 dark:bg-zinc-700 dark:text-zinc-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSortChange("date-created-desc");
                    }}
                  >
                    Date Created (Newest First)
                  </button>
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      sortBy === "date-created-asc"
                        ? "bg-gray-100 text-gray-900 dark:bg-zinc-700 dark:text-zinc-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSortChange("date-created-asc");
                    }}
                  >
                    Date Created (Oldest First)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ActiveFilters resetPage={resetPage} />

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 dark:border-zinc-700">
          {/* Mobile view: 2x3 grid layout */}
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
                    {loading ? "..." : tab.count}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Desktop view: horizontal tabs */}
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
                  {loading ? "..." : tab.count}
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
                    {loading ? "..." : todoTasks.length}
                  </span>
                </div>
                <div className="space-y-3" style={{ minHeight: "580px" }}>
                  {loading ? (
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
                    {loading ? "..." : inProgressTasks.length}
                  </span>
                </div>
                <div className="space-y-3" style={{ minHeight: "580px" }}>
                  {loading ? (
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
                    {loading ? "..." : completedTasks.length}
                  </span>
                </div>
                <div className="space-y-3" style={{ minHeight: "580px" }}>
                  {loading ? (
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
                {loading ? (
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

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        resetPage={resetPage}
      />
    </div>
  );
};

export default TaskManagementContent;
