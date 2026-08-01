"use client";

import { Button } from "@/components/ui/button";
import { useRegister } from "./useRegister";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

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
    <form className="mt-8 space-y-5" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Full Name
        </label>

        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Enter your full name"
          className="h-11"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />

        {errors.name?.message && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

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
            type={visiblePassword.password ? "text" : "password"}
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
            onClick={() => togglePasswordVisibility("password")}
            aria-label={
              visiblePassword.password ? "Hide password" : "Show password"
            }
          >
            {visiblePassword.password ? <EyeOff /> : <Eye />}
          </Button>
        </div>

        {errors.password?.message && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Confirm password
        </label>

        <div className="relative">
          <Input
            id="confirmPassword"
            type={visiblePassword.confirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Confirm password"
            className="h-11 pr-12"
            aria-invalid={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
            onClick={() => togglePasswordVisibility("confirmPassword")}
            aria-label={
              visiblePassword.confirmPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {visiblePassword.confirmPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>

        {errors.confirmPassword?.message && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isPendingRegister}
      >
        {isPendingRegister ? <Spinner /> : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
