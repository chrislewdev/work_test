// src/app/userdashboard/client-page.tsx

"use client";

import React, { useEffect } from "react";
import DashboardContent from "@/components/dashboard/DashboardContent";
import useAuthStore from "@/stores/authStore";
import useProfileStore from "@/stores/profileStore";

export default function UserDashboardClientPage() {
  const { user } = useAuthStore();
  const { profile, fetchProfile } = useProfileStore();

  // If authenticated but no profile loaded, fetch it
  useEffect(() => {
    if (user && !profile) {
      fetchProfile(user.id);
    }
  }, [user, profile, fetchProfile]);

  return <DashboardContent />;
}
