// src/components/auth/SignupForm.tsx

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthFormBase from "@/components/auth/AuthFormBase";
import useAuthStore from "@/stores/authStore";
import { useForm } from "@/app/hooks/useForm";
import { useFormSubmission } from "@/app/hooks/useFormSubmission";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const router = useRouter();
  const { register, isAuthenticated, authState, resetState } = useAuthStore();
  const { loading, error, success } = authState;

  // Reset auth state on component unmount - consistent pattern
  useResetOnUnmount(resetState.auth);

  // Form validation rules
  const validationRules = {
    firstName: {
      required: "First name is required",
    },
    lastName: {
      required: "Last name is required",
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
    confirmPassword: {
      required: "Please confirm your password",
      validate: (value: string, formValues: SignupFormValues) =>
        value === formValues.password || "Passwords do not match",
    },
  };

  // Initialize form with useForm hook
  const form = useForm<SignupFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationRules,
  });

  // Handle form submission
  const formSubmission = useFormSubmission<SignupFormValues>({
    onSubmit: async (data) => {
      await register(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
        data.password
      );
    },
    redirectPath: "/userdashboard",
    redirectDelay: 1500,
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/userdashboard");
    }
  }, [isAuthenticated, router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only reset if we had a previous error - consistent pattern
    if (authState.error) {
      resetState.auth();
    }

    await form.handleSubmit(e);

    // If form is valid, submit it
    if (Object.keys(form.errors).length === 0) {
      await formSubmission.submit(form.values);

      // Auto-reset success state after a delay if successful
      // Consistent pattern for success state management
      if (authState.success) {
        setTimeout(() => resetState.auth({ preserve: true }), 3000);
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
        title: "Account created successfully!",
        message: "Redirecting you to the dashboard...",
      };
    }

    return undefined;
  };

  // Create footer content
  const footerContent = (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Already have an account?{" "}
      <Link href="/login" className="text-black dark:text-white font-medium">
        Sign in →
      </Link>
    </p>
  );

  return (
    <AuthFormBase
      title="Create an Account"
      subtitle="Join our platform to connect and collaborate"
      formStatus={getFormStatus()}
      footer={footerContent}
      width="wide"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields omitted for brevity */}
      </form>
    </AuthFormBase>
  );
};

export default SignupForm;
