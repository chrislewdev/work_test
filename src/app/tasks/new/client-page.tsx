// app/tasks/new/client-page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui_blocks/Container";
import BackButton from "@/components/ui_blocks/BackButton";
import useTaskStore from "@/stores/taskStore";
import { Task } from "@/stores/taskStore";

type FormData = Omit<Task, "id" | "owner" | "status">;

export default function NewTaskClientPage() {
  const router = useRouter();
  const { createTask, loading, error, clearError } = useTaskStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Initial form state
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    topic: "",
    subject: "",
    dateCreated: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    deadline: "",
    budget: 0,
  });

  // Form validation state
  const [validationErrors, setValidationErrors] = useState<{
    [key in keyof FormData]?: string;
  }>({});

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle number conversion for budget
    if (name === "budget") {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear validation error for the field being edited
    if (validationErrors[name as keyof FormData]) {
      setValidationErrors({
        ...validationErrors,
        [name]: undefined,
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: { [key in keyof FormData]?: string } = {};
    let isValid = true;

    // Required fields
    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!formData.topic.trim()) {
      errors.topic = "Topic is required";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.deadline) {
      errors.deadline = "Deadline is required";
      isValid = false;
    } else {
      const deadlineDate = new Date(formData.deadline);
      const currentDate = new Date();

      if (deadlineDate <= currentDate) {
        errors.deadline = "Deadline must be in the future";
        isValid = false;
      }
    }

    if (formData.budget <= 0) {
      errors.budget = "Budget must be greater than 0";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setFormSubmitted(true);

    try {
      // Current user placeholder (this would come from auth in a real app)
      const currentUser = {
        id: "u123",
        name: "Sarah Johnson",
        profilePic: "/images/photos/image-1.jpg",
      };

      // Prepare complete task data
      const taskData: Omit<Task, "id"> = {
        ...formData,
        owner: currentUser,
        status: "available",
      };

      // Create the task
      await createTask(taskData);

      // Show success message
      setSuccessMessage("Task created successfully!");

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/tasks");
      }, 1500);
    } catch (error) {
      setFormSubmitted(false);
      console.error("Error creating task:", error);
    }
  };

  // Common topics and subjects from the existing data
  const topicOptions = [
    "Social Media",
    "TikTok",
    "YouTube",
    "Content Writing",
    "Photography",
    "Video Production",
    "Live Stream",
    "LinkedIn",
    "Pinterest",
    "Podcast",
    "Instagram",
  ];

  const subjectOptions = [
    "Content Creation",
    "Product Review",
    "Fashion",
    "Product Launch",
    "Beauty",
    "Technology",
    "Food",
    "Sustainability",
    "Home Decor",
    "Fitness",
    "Travel",
    "Wellness",
    "Cooking",
    "Professional",
    "Mobile Apps",
    "PR",
    "Crisis Management",
  ];

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="mb-8">
        <BackButton />
      </div>

      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 mb-8">
          Create New Task
        </h1>

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-md mb-6">
            <p>{successMessage}</p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                >
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter task title"
                  disabled={formSubmitted}
                />
                {validationErrors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {validationErrors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter task description"
                  disabled={formSubmitted}
                />
                {validationErrors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {validationErrors.description}
                  </p>
                )}
              </div>

              {/* Two-column layout for smaller fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Topic */}
                <div>
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Topic / Platform <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    disabled={formSubmitted}
                  >
                    <option value="">Select a topic</option>
                    {topicOptions.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  {validationErrors.topic && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {validationErrors.topic}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    disabled={formSubmitted}
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {validationErrors.subject && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {validationErrors.subject}
                    </p>
                  )}
                </div>

                {/* Deadline */}
                <div>
                  <label
                    htmlFor="deadline"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    min={new Date().toISOString().split("T")[0]} // Don't allow past dates
                    disabled={formSubmitted}
                  />
                  {validationErrors.deadline && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {validationErrors.deadline}
                    </p>
                  )}
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Budget ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    min="1"
                    step="1"
                    disabled={formSubmitted}
                  />
                  {validationErrors.budget && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {validationErrors.budget}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={formSubmitted || loading}
                >
                  {formSubmitted || loading
                    ? "Creating Task..."
                    : "Create Task"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
