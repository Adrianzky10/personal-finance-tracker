"use client";
import authServices from "@/services/api/auth.service";
import { ApiErrorResponse } from "@/types/apiResponse";
import {
  ResetPasswordInput,
  resetPasswordSchema,
} from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type PasswordField = "password" | "confirmPassword";

export function useResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const defaultValues: ResetPasswordInput = {
    token,
    password: "",
    confirmPassword: "",
  };

  const [visiblePassword, setVisiblePassword] = useState<
    Record<PasswordField, boolean>
  >({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { mutate: mutateResetPassword, isPending: isPendingResetPassword } =
    useMutation({
      mutationFn: (payload: ResetPasswordInput) =>
        authServices.resetPassword(payload),

      onSuccess: () => {
        reset();
        toast.success("Password reset successfully. You can now login.");
        router.push("/login");
      },

      onError: (error) => {
        let message = "An error occurred. Please try again.";

        if (isAxiosError<ApiErrorResponse>(error)) {
          message =
            error.response?.data.meta?.message ??
            "Failed to reset password. The link might be expired.";
        }

        toast.error(message);
        setError("root", { message });
      },
    });

  const togglePasswordVisibility = (field: PasswordField) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleResetPassword = (data: ResetPasswordInput) => {
    clearErrors("root");
    mutateResetPassword(data);
  };

  return {
    token,
    register,
    errors,
    onSubmit: handleSubmit(handleResetPassword),
    visiblePassword,
    togglePasswordVisibility,
    isPendingResetPassword,
  };
}
