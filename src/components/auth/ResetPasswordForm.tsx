// src/components/auth/ResetPasswordForm.tsx

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "@/components/ui_blocks/FormField";
import FormButton from "@/components/ui_blocks/FormButton";
import AuthFormBase from "@/components/auth/AuthFormBase";
import useAuthStore from "@/stores/authStore";
import { useForm } from "@/app/hooks/useForm";
import { useFormSubmission } from "@/app/hooks/useFormSubmission";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

interface ResetPasswordFormProps {
  token: string;
}

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const router = useRouter();
  const { resetPassword, resetPasswordState, resetState } = useAuthStore();
  const { loading, error } = resetPasswordState;

  // Reset password state on component unmount
  useResetOnUnmount(resetState.resetPassword);

  // Form validation rules
  const validationRules = {
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
    confirmPassword: {
      required: "Please confirm your password",
      validate: (value: string, formValues: ResetPasswordFormValues) =>
        value === formValues.password || "Passwords do not match",
    },
  };

  // Initialize form with useForm hook
  const form = useForm<ResetPasswordFormValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationRules,
  });

  // Handle form submission
  const formSubmission = useFormSubmission<ResetPasswordFormValues>({
    onSubmit: async (data) => {
      // In a real app, we would pass the token to resetPassword
      // Here we simulate with empty string for old password
      await resetPassword("", data.password);
    },
    redirectPath: "/login",
    redirectDelay: 3000,
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only reset if we had a previous error
    if (resetPasswordState.error) {
      resetState.resetPassword();
    }

    await form.handleSubmit(e);

    // If form is valid, submit it
    if (Object.keys(form.errors).length === 0) {
      await formSubmission.submit(form.values);

      // Auto-reset success state after a delay if successful
      if (resetPasswordState.success) {
        setTimeout(() => resetState.resetPassword({ preserve: true }), 3000);
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
        title: "Password Changed Successfully",
        message:
          "Your password has been reset. You will be redirected to the login page in a few seconds.",
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
      title="Create New Password"
      subtitle="Please enter a new password for your account."
      formStatus={getFormStatus()}
      footer={footerContent}
    >
      {!formSubmission.isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="New Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("password")}
            error={form.errors.password}
            touched={form.touched.password}
            required
            disabled={loading || formSubmission.isSubmitting}
            helper="Password must be at least 6 characters"
          />

          <FormField
            label="Confirm New Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.values.confirmPassword}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("confirmPassword")}
            error={form.errors.confirmPassword}
            touched={form.touched.confirmPassword}
            required
            disabled={loading || formSubmission.isSubmitting}
          />

          <FormButton
            type="submit"
            fullWidth
            isLoading={loading || formSubmission.isSubmitting}
            loadingText="Resetting Password..."
          >
            Reset Password
          </FormButton>
        </form>
      ) : (
        <div className="text-center">
          {/* Using as={Link} with href prop */}
          <FormButton
            as={Link}
            href="/login"
            variant="primary"
            className="mt-4"
          >
            Go to Login
          </FormButton>
        </div>
      )}
    </AuthFormBase>
  );
};

export default ResetPasswordForm;
