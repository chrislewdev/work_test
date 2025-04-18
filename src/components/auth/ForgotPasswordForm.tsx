// src/components/auth/ForgotPasswordForm.tsx

"use client";

import React from "react";
import Link from "next/link";
import FormField from "@/components/ui_blocks/FormField";
import FormButton from "@/components/ui_blocks/FormButton";
import AuthFormBase from "@/components/auth/AuthFormBase";
import useAuthStore from "@/stores/authStore";
import { useForm } from "@/app/hooks/useForm";
import { useFormSubmission } from "@/app/hooks/useFormSubmission";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, forgotPasswordState, resetState } = useAuthStore();
  const { loading, error, success } = forgotPasswordState;

  // Reset forgot password state on component unmount - consistent pattern
  useResetOnUnmount(resetState.forgotPassword);

  // Form validation rules
  const validationRules = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
  };

  // Initialize form with useForm hook
  const form = useForm<ForgotPasswordFormValues>({
    initialValues: {
      email: "",
    },
    validationRules,
  });

  // Handle form submission
  const formSubmission = useFormSubmission<ForgotPasswordFormValues>({
    onSubmit: async (data) => {
      await forgotPassword(data.email);
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only reset if we had a previous error - consistent pattern
    if (forgotPasswordState.error) {
      resetState.forgotPassword();
    }

    await form.handleSubmit(e);

    // If form is valid, submit it
    if (Object.keys(form.errors).length === 0) {
      await formSubmission.submit(form.values);

      // Auto-reset success state after a delay if successful
      // Consistent pattern for success state management
      if (forgotPasswordState.success) {
        setTimeout(() => resetState.forgotPassword({ preserve: true }), 3000);
      }
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

    if (formSubmission.isSubmitted) {
      return {
        type: "success" as const,
        title: "Password Reset Email Sent",
        message:
          "If an account exists with the email you provided, you'll receive instructions to reset your password shortly.",
      };
    }

    return undefined;
  };

  // Create footer content
  const footerContent = (
    <Link
      href="/login"
      className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
    >
      ← Back to login
    </Link>
  );

  return (
    <AuthFormBase
      title="Forgot your password?"
      subtitle="Enter your email address and we'll send you instructions to reset your password."
      formStatus={getFormStatus()}
      footer={footerContent}
    >
      {!formSubmission.isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Email Address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("email")}
            error={form.errors.email}
            touched={form.touched.email}
            required
            disabled={loading || formSubmission.isSubmitting}
          />

          <FormButton
            type="submit"
            fullWidth
            isLoading={loading || formSubmission.isSubmitting}
            loadingText="Sending..."
          >
            Send Reset Instructions
          </FormButton>
        </form>
      ) : (
        <div className="text-center">
          <FormButton
            as={Link}
            href="/login"
            variant="primary"
            className="mt-4"
          >
            Return to login
          </FormButton>
        </div>
      )}
    </AuthFormBase>
  );
};

export default ForgotPasswordForm;
