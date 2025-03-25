// components/auth/ResetPasswordForm.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui_blocks/Input";
import Button from "@/components/ui_blocks/Button";
import useAuthStore from "@/stores/authStore";

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  const { resetPassword, loading, error, clearError } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }

    try {
      // In a real app, you'd pass the token to resetPassword
      // Here we'll simulate with the old password as empty
      await resetPassword("", formData.password);
      setSubmitted(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      // Error will be handled by the store
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <span className="ml-2 text-xl font-bold">
            Asia Influencer X Talent Deck
          </span>
        </div>
      </div>

      {/* Success Message */}
      {submitted && !error && (
        <div className="p-6 mb-6 bg-green-50 border border-green-100 text-green-700 rounded-md">
          <h3 className="text-lg font-medium mb-2">
            Password Changed Successfully
          </h3>
          <p className="mb-4">
            Your password has been reset. You will be redirected to the login
            page in a few seconds.
          </p>
          <Link href="/login" className="text-green-700 font-medium underline">
            Go to login now
          </Link>
        </div>
      )}

      {/* Form */}
      {!submitted && (
        <div>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Create New Password</h1>
            <p className="mt-2 text-gray-600">
              Please enter a new password for your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {(error || formError) && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
                {formError || error}
              </div>
            )}

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </Button>

            {/* Back to Login */}
            <div className="text-center mt-4">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ← Back to login
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
