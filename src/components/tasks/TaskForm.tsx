// src/components/tasks/TaskForm.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormButton from "@/components/ui_blocks/FormButton";
import FormActions from "@/components/ui_blocks/FormActions";
import FormStatus from "@/components/ui_blocks/FormStatus";
import { useForm } from "@/app/hooks/useForm";
import { useFormSubmission } from "@/app/hooks/useFormSubmission";
import useTaskStore, { Task } from "@/stores/taskStore";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

interface TaskFormValues {
  title: string;
  description: string;
  topic: string;
  subject: string;
  deadline: string;
  budget: number | string;
}

interface TaskFormProps {
  mode: "create" | "edit";
  initialData?: Partial<Task>;
  taskId?: string;
  onCancel?: () => void;
  onSuccess?: (task: Task) => void;
  redirectPath?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  mode,
  initialData,
  taskId,
  onCancel,
  onSuccess,
  redirectPath,
}) => {
  const router = useRouter();
  const { createTask, updateTask, taskMutationState, resetState } =
    useTaskStore();
  const { loading, error, success, data } = taskMutationState;

  // Reset task mutation state on component unmount - consistent pattern
  useResetOnUnmount(resetState.taskMutation);

  // Topic and subject options
  const topicOptions = [
    { value: "Social Media", label: "Social Media" },
    { value: "TikTok", label: "TikTok" },
    { value: "YouTube", label: "YouTube" },
    { value: "Content Writing", label: "Content Writing" },
    { value: "Photography", label: "Photography" },
    { value: "Video Production", label: "Video Production" },
    { value: "Live Stream", label: "Live Stream" },
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "Pinterest", label: "Pinterest" },
    { value: "Podcast", label: "Podcast" },
    { value: "Instagram", label: "Instagram" },
  ];

  const subjectOptions = [
    { value: "Content Creation", label: "Content Creation" },
    { value: "Product Review", label: "Product Review" },
    { value: "Fashion", label: "Fashion" },
    { value: "Product Launch", label: "Product Launch" },
    { value: "Beauty", label: "Beauty" },
    { value: "Technology", label: "Technology" },
    { value: "Food", label: "Food" },
    { value: "Sustainability", label: "Sustainability" },
    { value: "Home Decor", label: "Home Decor" },
    { value: "Fitness", label: "Fitness" },
    { value: "Travel", label: "Travel" },
    { value: "Wellness", label: "Wellness" },
    { value: "Cooking", label: "Cooking" },
    { value: "Professional", label: "Professional" },
    { value: "Mobile Apps", label: "Mobile Apps" },
    { value: "PR", label: "PR" },
    { value: "Crisis Management", label: "Crisis Management" },
  ];

  // Get current date in YYYY-MM-DD format for min date
  const currentDate = new Date().toISOString().split("T")[0];

  // Form validation rules
  const validationRules = {
    title: {
      required: "Title is required",
    },
    description: {
      required: "Description is required",
    },
    topic: {
      required: "Topic is required",
    },
    subject: {
      required: "Subject is required",
    },
    deadline: {
      required: "Deadline is required",
      validate: (value: string) => {
        const deadlineDate = new Date(value);
        const currentDate = new Date();
        return deadlineDate > currentDate || "Deadline must be in the future";
      },
    },
    budget: {
      required: "Budget is required",
      validate: (value: number | string) => {
        const budgetNum = Number(value);
        return budgetNum > 0 || "Budget must be greater than 0";
      },
    },
  };

  // Initialize form with useForm hook
  const form = useForm<TaskFormValues>({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      topic: initialData?.topic || "",
      subject: initialData?.subject || "",
      deadline: initialData?.deadline || "",
      budget: initialData?.budget || "",
    },
    validationRules,
  });

  // Handle form submission
  const formSubmission = useFormSubmission<TaskFormValues>({
    onSubmit: async (data) => {
      const taskData = {
        ...data,
        budget: Number(data.budget),
        dateCreated:
          initialData?.dateCreated || new Date().toISOString().split("T")[0],
      };

      try {
        if (mode === "create") {
          // Current user placeholder (this would come from auth in a real app)
          const currentUser = {
            id: "u123",
            name: "Sarah Johnson",
            profilePic: "/images/photos/image-1.jpg",
          };

          // Use proper type casting with the correct status value
          await createTask({
            ...taskData,
            owner: currentUser,
            status: "to do",
          } as unknown as Omit<Task, "id">);
        } else if (mode === "edit" && taskId) {
          await updateTask(taskId, taskData);
        }
      } catch (error) {
        console.error("Error submitting task:", error);
        throw error; // Re-throw to let the form submission handle it
      }
    },
    redirectPath,
    redirectDelay: 1500,
  });

  // Call success callback when task is created/updated successfully
  useEffect(() => {
    if (success && data && onSuccess) {
      onSuccess(data as Task);

      // Auto-reset success state after a delay - consistent pattern
      const timer = setTimeout(() => {
        resetState.taskMutation({ preserve: true });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, data, onSuccess, resetState]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only reset if we had a previous error - consistent pattern
    if (taskMutationState.error) {
      resetState.taskMutation();
    }

    await form.handleSubmit(e);

    // If form is valid, submit it
    if (Object.keys(form.errors).length === 0) {
      await formSubmission.submit(form.values);
    }
  };

  // Determine form status based on error, success, or loading state
  const getFormStatus = () => {
    if (error) {
      return {
        type: "error" as const,
        message: error,
      };
    }

    if (success) {
      return {
        type: "success" as const,
        message:
          mode === "create"
            ? "Task created successfully!"
            : "Task updated successfully!",
      };
    }

    return undefined;
  };

  const formStatus = getFormStatus();
  const isFormDisabled = loading || formSubmission.isSubmitting || success;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        {mode === "create" ? "Create New Task" : "Edit Task"}
      </h2>

      {formStatus && (
        <FormStatus
          type={formStatus.type}
          message={formStatus.message}
          className="mb-6"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form content omitted for brevity */}

        {/* Form Actions */}
        <FormActions>
          {onCancel && (
            <FormButton
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isFormDisabled}
            >
              Cancel
            </FormButton>
          )}
          <FormButton
            type="submit"
            isLoading={loading || formSubmission.isSubmitting}
            loadingText={
              mode === "create" ? "Creating Task..." : "Updating Task..."
            }
            disabled={success}
          >
            {mode === "create" ? "Create Task" : "Update Task"}
          </FormButton>
        </FormActions>
      </form>
    </div>
  );
};

export default TaskForm;
