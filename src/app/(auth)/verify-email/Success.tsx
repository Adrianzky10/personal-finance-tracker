import Link from "next/link";
import { CircleCheckBig } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Success() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 rounded-full bg-green-100 p-4">
        <CircleCheckBig className="size-10 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold text-foreground">Email verified</h1>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Your email has been successfully verified.
      </p>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        You can now sign in to your account and start managing your personal
        finances.
      </p>

      <Button asChild className="mt-8 w-full">
        <Link href="/login">Go to Login</Link>
      </Button>
    </div>
  );
}
