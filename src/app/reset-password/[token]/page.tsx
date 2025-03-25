// app/reset-password/[token]/page.tsx

"use client";

import React from "react";
import { useParams } from "next/navigation";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params?.token as string;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <ResetPasswordForm token={token} />
    </div>
  );
}
