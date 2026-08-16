"use client";
import authServices from "@/services/api/auth.service";
import { ApiErrorResponse } from "@/types/apiResponse";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues: ForgotPasswordInput = {
  email: "",
};

export function useForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    mutate: mutateForgotPassword,
    isPending: isPendingForgotPassword,
  } = useMutation({
    mutationFn: (payload: ForgotPasswordInput) =>
      authServices.forgotPassword(payload),

    onSuccess: (response) => {
      reset();
      setIsSuccess(true);
      toast.success(
        response.data?.meta?.message || "Password reset link sent!",
      );
    },

    onError: (error) => {
      let message = "An error occurred. Please try again.";

      if (isAxiosError<ApiErrorResponse>(error)) {
        message =
          error.response?.data.meta?.message ??
          "Failed to process your request.";
      }

      toast.warning(message);

      setError("root", { message });
    },
  });

  const handleForgotPassword = (data: ForgotPasswordInput) => {
    clearErrors("root");
    mutateForgotPassword(data);
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(handleForgotPassword),
    isPendingForgotPassword,
    isSuccess,
  };
}
