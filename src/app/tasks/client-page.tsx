// app/tasks/client-page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import TaskCard from "@/components/tasks/TaskCard";
import Button from "@/components/ui_blocks/Button";
import useTaskStore, { TaskSortOption } from "@/stores/taskStore";
import {
  PlusIcon,
  ArrowsUpDownIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import FilterPanel from "@/components/tasks/FilterPanel";
import ActiveFilters from "@/components/tasks/ActiveFilters";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

interface TasksClientPageProps {
  initialPage?: number;
}

export default function TasksClientPage({
  initialPage = 1,
}: TasksClientPageProps) {
  const {
    tasks,
    filteredTasks,
    fetchTasks,
    sortBy,
    setSortOption,
    activeFilterCount,
    resetState,
    taskListState,
  } = useTaskStore();

  // Extract loading and error from taskListState
  const { loading, error } = taskListState;

  const router = useRouter();

  // Reset task list state on component unmount
  useResetOnUnmount(resetState.taskList);

  // State for current page
  const [currentPage, setCurrentPage] = useState(initialPage);
  // State for sort dropdown visibility
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  // State for filter panel visibility
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  // Last active filter count for tracking changes
  const [lastFilterCount, setLastFilterCount] = useState(activeFilterCount);

  // Number of tasks per page (3x3 grid)
  const tasksPerPage = 9;

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  // Get current tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Fetch tasks on component mount
  useEffect(() => {
    // Fetch tasks - they will be sorted by the default sort option in the store
    fetchTasks();
  }, [fetchTasks]);

  // Track filter changes and reset pagination
  useEffect(() => {
    // Only react to actual changes in the filter count
    if (activeFilterCount !== lastFilterCount) {
      setLastFilterCount(activeFilterCount);
      setCurrentPage(1);
      router.push("/tasks?page=1");
    }
  }, [activeFilterCount, lastFilterCount, router]);

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
    router.push("/tasks?page=1");
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

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  // Handle page navigation
  const goToPage = (page: number) => {
    setCurrentPage(page);
    router.push(`/tasks?page=${page}`);
  };

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Only close if clicking outside of the dropdown menu
      if (showSortDropdown && !target.closest("[data-sort-dropdown]")) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 mt-16 lg:mt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Available Tasks
          </h1>
          <div className="flex items-center gap-4">
            {/* Filter button */}
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700"
              onClick={toggleFilterPanel}
            >
              <FunnelIcon className="h-4 w-4" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-rose-600 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort dropdown */}
            <div className="relative" data-sort-dropdown>
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSortDropdown(!showSortDropdown);
                }}
              >
                <ArrowsUpDownIcon className="h-4 w-4" />
                <span>{getSortDisplayText(sortBy)}</span>
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

            <Button
              className="flex items-center gap-2"
              onClick={() => router.push("/tasks/new")}
            >
              <PlusIcon className="h-5 w-5" />
              Add New Task
            </Button>
          </div>
        </div>

        {/* Active filters */}
        <ActiveFilters resetPage={resetPage} />

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Loading tasks...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredTasks.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-lg">
            <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-2">
              No tasks available
            </h3>
            {activeFilterCount > 0 ? (
              <>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  No tasks match your current filters. Try adjusting your
                  filters or clearing them.
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    useTaskStore.getState().clearFilters();
                    resetPage();
                  }}
                >
                  Clear All Filters
                </Button>
              </>
            ) : (
              <>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  There are currently no tasks available. Create a new task or
                  check back later.
                </p>
                <Button
                  variant="primary"
                  onClick={() => router.push("/tasks/new")}
                >
                  Create Task
                </Button>
              </>
            )}
          </div>
        )}

        {/* Tasks grid */}
        {!loading && !error && filteredTasks.length > 0 && (
          <div className="min-h-[850px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center h-[50px]">
                <div className="flex space-x-2 items-center">
                  <Button
                    variant="secondary"
                    className="w-[100px]"
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center px-4 text-sm text-zinc-700 dark:text-zinc-300 w-[120px] justify-center">
                    Page {currentPage} of {totalPages}
                  </div>

                  <Button
                    variant="secondary"
                    className="w-[100px]"
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        resetPage={resetPage}
      />
    </>
  );
}
