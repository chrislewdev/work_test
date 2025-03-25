// components/auth/LoginForm.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/ui_blocks/Input";
import Button from "@/components/ui_blocks/Button";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login, isAuthenticated, loading, error, clearError } = useAuthStore();
  const { fetchProfile } = useProfileStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);

    // If login successful, the isAuthenticated state will change
    // and the useEffect above will handle redirection
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

      {/* Login Form */}
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
            Email
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

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? "Signing in..." : "Sign in to account"}
        </Button>

        {/* Registration Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-black font-medium">
              Get access →
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
