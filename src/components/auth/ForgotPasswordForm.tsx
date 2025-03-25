// components/auth/ForgotPasswordForm.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Input from "@/components/ui_blocks/Input";
import Button from "@/components/ui_blocks/Button";
import useAuthStore from "@/stores/authStore";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { forgotPassword, loading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
    setSubmitted(true);
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
            Password Reset Email Sent
          </h3>
          <p className="mb-4">
            If an account exists with the email you provided, you'll receive
            instructions to reset your password shortly.
          </p>
          <Link href="/login" className="text-green-700 font-medium underline">
            Return to login
          </Link>
        </div>
      )}

      {/* Form */}
      {!submitted && (
        <div>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Forgot your password?</h1>
            <p className="mt-2 text-gray-600">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Sending..." : "Send Reset Instructions"}
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

export default ForgotPasswordForm;
