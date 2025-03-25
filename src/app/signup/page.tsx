// app/signup/page.tsx

import React from "react";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <SignupForm />
    </div>
  );
}
