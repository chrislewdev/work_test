// app/userdashboard/page.tsx

import React from "react";
import DashboardContent from "@/components/dashboard/DashboardContent";

export const metadata = {
  title: "User Dashboard",
  description: "User dashboard main page",
};

export default function UserDashboardPage() {
  return <DashboardContent />;
}
