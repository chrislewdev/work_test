// app/userdashboard/profile/edit/page.tsx

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/ui_blocks/BackButton";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";

export default function ProfileEditPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { profile, loading, error, fetchProfile, resetState } =
    useProfileStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user && !profile) {
      // If authenticated but no profile loaded, fetch it
      fetchProfile(user.id);
    }
  }, [isAuthenticated, user, profile, router, fetchProfile]);

  // Reset profile state when component unmounts
  useEffect(() => {
    return () => {
      resetState.profile(); // Use the correct reset method from resetState
    };
  }, [resetState]);

  // Handle cancel button click
  const handleCancel = () => {
    router.push("/userdashboard/profile");
  };

  // Handle success
  const handleSuccess = () => {
    // Navigate back to profile page
    router.push("/userdashboard/profile");
  };

  // Show loading state
  if (loading || !profile) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <BackButton />
        </div>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Loading profile data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Edit Profile
        </h1>

        <ProfileEditForm
          user={profile}
          onCancel={handleCancel}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
