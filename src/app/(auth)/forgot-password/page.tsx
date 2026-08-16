import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-6 sm:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
