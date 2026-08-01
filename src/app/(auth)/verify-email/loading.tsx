import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-6 rounded-full bg-blue-50 p-4">
        <Loader2 className="size-10 animate-spin text-brand" />
      </div>

      <h1 className="text-3xl font-bold text-slate-900">
        Verifying your email
      </h1>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Please wait while we verify your account.
      </p>
    </div>
  );
}
