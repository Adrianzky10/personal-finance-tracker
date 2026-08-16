import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
