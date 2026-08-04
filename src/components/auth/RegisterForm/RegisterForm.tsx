"use client";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { useRegister } from "./useRegister";

const RegisterForm = () => {
  const {
    visiblePassword,
    togglePasswordVisibility,
    register,
    errors,
    onSubmit,
    isPendingRegister,
  } = useRegister();

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Full Name
        </label>

        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          className="h-11 rounded-xl"
          aria-invalid={!!errors.name}
          {...register("name")}
        />

        {errors.name?.message && (
          <p role="alert" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

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
          className="h-11 rounded-xl"
          aria-invalid={!!errors.email}
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
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>

        <div className="relative">
          <Input
            id="password"
            type={visiblePassword.password ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a password"
            className="h-11 rounded-xl pr-12"
            aria-invalid={!!errors.password}
            {...register("password")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => togglePasswordVisibility("password")}
            className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 rounded-lg text-muted-foreground hover:text-foreground"
            aria-label={
              visiblePassword.password ? "Hide password" : "Show password"
            }
          >
            {visiblePassword.password ? (
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

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-foreground"
        >
          Confirm Password
        </label>

        <div className="relative">
          <Input
            id="confirmPassword"
            type={visiblePassword.confirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Confirm your password"
            className="h-11 rounded-xl pr-12"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => togglePasswordVisibility("confirmPassword")}
            className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 rounded-lg text-muted-foreground hover:text-foreground"
            aria-label={
              visiblePassword.confirmPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {visiblePassword.confirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        {errors.confirmPassword?.message && (
          <p role="alert" className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="h-11 w-full rounded-xl font-semibold"
        disabled={isPendingRegister}
      >
        {isPendingRegister ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
