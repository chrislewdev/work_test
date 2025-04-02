// app/forgot-password/page.tsx

import React from "react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <ForgotPasswordForm />
    </div>
  );
}
