// src/app/userdashboard/available-tasks/client-page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AvailableTaskCard from "@/components/dashboard/AvailableTaskCard";
import useTaskStore, { TaskSortOption } from "@/stores/taskStore";
import { ArrowsUpDownIcon, FunnelIcon } from "@heroicons/react/24/outline";
import FilterPanel from "@/components/tasks/FilterPanel";
import ActiveFilters from "@/components/tasks/ActiveFilters";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

interface AvailableTasksClientPageProps {
  initialPage?: number;
}

export default function AvailableTasksClientPage({
  initialPage = 1,
}: AvailableTasksClientPageProps) {
  const {
    tasks,
    filteredTasks,
    taskListState,
    fetchTasks,
    sortBy,
    setSortOption,
    activeFilterCount,
    resetState,
  } = useTaskStore();

  // Extract loading and error from taskListState
  const { loading, error } = taskListState;

  const router = useRouter();

  // Reset task list state on component unmount - consistent pattern
  useResetOnUnmount(resetState.taskList);

  // State for current page
  const [currentPage, setCurrentPage] = useState(initialPage);
  // State for sort dropdown visibility
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  // State for filter panel visibility
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  // Last active filter count for tracking changes
  const [lastFilterCount, setLastFilterCount] = useState(activeFilterCount);

  // Number of tasks per page
  const tasksPerPage = 9;

  // Calculate total number of pages
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / tasksPerPage)
  );

  // Get current tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

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

  // Handle page navigation
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Available Tasks
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

      {/* Loading state */}
      {loading && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6" style={{ minHeight: "900px" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-zinc-700 rounded-lg animate-pulse h-[280px]"
                >
                  <div className="flex justify-between p-4">
                    <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-1/4"></div>
                  </div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 dark:bg-zinc-600 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loading state pagination (for consistent UI) */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-zinc-700 flex items-center justify-between">
            <div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-600 rounded w-40"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 dark:bg-zinc-600 rounded w-20"></div>
              <div className="flex gap-1">
                <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-600 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-600 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-600 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-zinc-600 rounded w-20"></div>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6" style={{ minHeight: "900px" }}>
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                Error Loading Tasks
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md text-center">
                {error}
              </p>
              <button
                onClick={() => {
                  resetState.taskList();
                  fetchTasks();
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>

          {/* Error state pagination (for consistent UI) */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-zinc-700 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">0</span> of{" "}
                <span className="font-medium">0</span> tasks
              </p>
            </div>
            <div className="flex gap-2">
              <button
                disabled={true}
                className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex gap-1">
                <button
                  disabled={true}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  1
                </button>
              </div>
              <button
                disabled={true}
                className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredTasks.length === 0 && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6" style={{ minHeight: "900px" }}>
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-zinc-700 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400 dark:text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H5zm0 2h10v8H5V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No tasks available
              </h3>
              {activeFilterCount > 0 ? (
                <>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    No tasks match your current filters. Try adjusting your
                    filters or clearing them.
                  </p>
                  <button
                    onClick={() => {
                      useTaskStore.getState().clearFilters();
                      resetPage();
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Clear All Filters
                  </button>
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  There are currently no tasks available. Check back later for
                  new opportunities.
                </p>
              )}
            </div>
          </div>

          {/* Empty state pagination (for consistent UI) */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-zinc-700 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">0</span> of{" "}
                <span className="font-medium">0</span> tasks
              </p>
            </div>
            <div className="flex gap-2">
              <button
                disabled={true}
                className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex gap-1">
                <button
                  disabled={true}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  1
                </button>
              </div>
              <button
                disabled={true}
                className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tasks grid */}
      {!loading && !error && filteredTasks.length > 0 && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-[repeat(3,280px)]">
              {currentTasks.map((task) => (
                <AvailableTaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Pagination - always shown */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-zinc-700 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{" "}
                <span className="font-medium">{indexOfFirstTask + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastTask, filteredTasks.length)}
                </span>{" "}
                of <span className="font-medium">{filteredTasks.length}</span>{" "}
                tasks
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  // Logic to show pages around the current page
                  let pageNum;
                  if (totalPages <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage === 1) {
                    pageNum = i + 1;
                  } else if (currentPage === totalPages) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 dark:border-zinc-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        resetPage={resetPage}
      />
    </div>
  );
}
