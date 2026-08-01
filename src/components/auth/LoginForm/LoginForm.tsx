"use client";

import { Button } from "@/components/ui/button";
import { useLogin } from "./useLogin";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm() {
  const {
    register,
    errors,
    onSubmit,
    isVisiblePassword,
    togglePasswordVisibility,
    isPendingLogin,
  } = useLogin();
  return (
    <form className="mt-8 space-y-5" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Email
        </label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          className="h-11"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />

        {errors.email?.message && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Password
        </label>

        <div className="relative">
          <Input
            id="password"
            type={isVisiblePassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Password"
            className="h-11 pr-12"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
            onClick={togglePasswordVisibility}
            aria-label={isVisiblePassword ? "Hide password" : "Show password"}
          >
            {isVisiblePassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>

        {errors.password?.message && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isPendingLogin}
      >
        {isPendingLogin ? <Spinner /> : "Login"}
      </Button>
    </form>
  );
}
