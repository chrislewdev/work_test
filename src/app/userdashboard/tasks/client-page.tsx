// app/userdashboard/tasks/client-page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TaskManagementContent from "@/components/dashboard/TaskManagementContent";
import useTaskStore, { TaskSortOption } from "@/stores/taskStore";
import { ArrowsUpDownIcon, FunnelIcon } from "@heroicons/react/24/outline";
import FilterPanel from "@/components/tasks/FilterPanel";
import ActiveFilters from "@/components/tasks/ActiveFilters";

interface TasksClientPageProps {
  initialPage?: number;
}

export default function TasksClientPage({
  initialPage = 1,
}: TasksClientPageProps) {
  const {
    tasks,
    filteredTasks,
    loading,
    error,
    fetchTasks,
    sortBy,
    setSortOption,
    activeFilterCount,
  } = useTaskStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for current page
  const [currentPage, setCurrentPage] = useState(initialPage);
  // State for sort dropdown visibility
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  // State for filter panel visibility
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  // Last active filter count for tracking changes
  const [lastFilterCount, setLastFilterCount] = useState(activeFilterCount);

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

  // Fetch tasks on component mount
  useEffect(() => {
    // Fetch tasks - they will be sorted by the default sort option in the store
    fetchTasks();

    // Apply sort option from URL if available
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSortOption(sortParam as TaskSortOption);
    }
  }, [fetchTasks, searchParams, setSortOption]);

  // Track filter changes and reset pagination
  useEffect(() => {
    // Only react to actual changes in the filter count
    if (activeFilterCount !== lastFilterCount) {
      setLastFilterCount(activeFilterCount);
      setCurrentPage(1);
    }
  }, [activeFilterCount, lastFilterCount]);

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
    <div className="space-y-6">
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

      <TaskManagementContent />

      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        resetPage={resetPage}
      />
    </div>
  );
}
