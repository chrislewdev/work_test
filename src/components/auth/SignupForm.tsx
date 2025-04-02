// src/components/auth/SignupForm.tsx

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

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const router = useRouter();
  const { register, isAuthenticated, loading, error, clearError } =
    useAuthStore();

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

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={form.values.firstName}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("firstName")}
            error={form.errors.firstName}
            touched={form.touched.firstName}
            required
            disabled={loading || formSubmission.isSubmitting}
          />

          <FormField
            label="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={form.values.lastName}
            onChange={form.handleChange}
            onBlur={() => form.handleBlur("lastName")}
            error={form.errors.lastName}
            touched={form.touched.lastName}
            required
            disabled={loading || formSubmission.isSubmitting}
          />
        </div>

        <FormField
          label="Email"
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

        <FormField
          label="Password"
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
          label="Confirm Password"
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
          loadingText="Creating Account..."
        >
          Create Account
        </FormButton>
      </form>
    </AuthFormBase>
  );
};

export default SignupForm;
