// app/userdashboard/profile/page.tsx

import React from "react";
import ProfileContent from "@/components/dashboard/ProfileContent";

export const metadata = {
  title: "User Profile",
  description: "User profile management page",
};

export default function ProfilePage() {
  return <ProfileContent />;
}
