// src/components/auth/LoginForm.tsx

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthFormBase from "@/components/auth/AuthFormBase";
import useAuthStore from "@/stores/authStore";
import { useForm } from "@/app/hooks/useForm";
import { useFormSubmission } from "@/app/hooks/useFormSubmission";
import { useResetOnUnmount } from "@/app/hooks/useStateReset";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, isAuthenticated, authState, resetState } = useAuthStore();
  const { loading, error, success } = authState;

  // Reset auth state on component unmount
  useResetOnUnmount(resetState.auth);

  // Form validation rules
  const validationRules = {
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
  };

  // Initialize form with useForm hook
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationRules,
  });

  // Handle form submission
  const formSubmission = useFormSubmission<LoginFormValues>({
    onSubmit: async (data) => {
      await login(data.email, data.password);
    },
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

    // Only reset if we had a previous error
    if (authState.error) {
      resetState.auth();
    }

    await form.handleSubmit(e);

    // If form is valid, submit it
    if (Object.keys(form.errors).length === 0) {
      await formSubmission.submit(form.values);
    }
  };

  // Determine form status based on error or loading state
  const getFormStatus = () => {
    if (error) {
      return {
        type: "error" as const,
        message: error,
      };
    }

    return undefined;
  };

  // Create footer content
  const footerContent = (
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Don't have an account?{" "}
      <Link href="/signup" className="text-black dark:text-white font-medium">
        Get access →
      </Link>
    </p>
  );

  return (
    <AuthFormBase
      title="Sign in to your account"
      subtitle="Welcome back! Please enter your details."
      formStatus={getFormStatus()}
      footer={footerContent}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields omitted for brevity */}
      </form>
    </AuthFormBase>
  );
};

export default LoginForm;
