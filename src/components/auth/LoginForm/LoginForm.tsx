"use client";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useLogin } from "@/hooks/auth/useLogin";

interface PropTypes {
  callbackUrl?: string;
}

export function LoginForm({ callbackUrl }: PropTypes) {
  const {
    register,
    errors,
    onSubmit,
    isVisiblePassword,
    togglePasswordVisibility,
    isPendingLogin,
  } = useLogin(callbackUrl);

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
          className="h-11 rounded-xl"
          {...register("email")}
        />

        {errors.email?.message && (
          <p role="alert" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>

          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-xs text-primary"
          >
            Forgot Password?
          </Button>
        </div>

        <div className="relative">
          <Input
            id="password"
            type={isVisiblePassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={!!errors.password}
            className="h-11 rounded-xl pr-12"
            {...register("password")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={togglePasswordVisibility}
            className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 rounded-lg text-muted-foreground hover:text-foreground"
            aria-label={isVisiblePassword ? "Hide password" : "Show password"}
          >
            {isVisiblePassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        {errors.password?.message && (
          <p role="alert" className="text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="h-11 w-full rounded-xl font-semibold"
        disabled={isPendingLogin}
      >
        {isPendingLogin ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
