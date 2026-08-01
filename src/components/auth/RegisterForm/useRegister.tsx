"use client";
import authServices from "@/services/api/auth.service";
import { ApiErrorResponse } from "@/types/apiResponse";
import { RegisterInput, registerSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type PasswordField = "password" | "confirmPassword";

const defaultValues: RegisterInput = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function useRegister() {
  const router = useRouter();

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
    getValues,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: RegisterInput) => authServices.register(payload),

    onSuccess: (_, payload) => {
      reset();

      toast.success("Registrasi berhasil. Silakan periksa email Anda.");

      const cooldownSeconds = 120;
      const storageKey = `resend_cooldown_${payload.email}`;
      localStorage.setItem(
        storageKey,
        (Date.now() + cooldownSeconds * 1000).toString(),
      );

      router.push(
        `/check-email?email=${encodeURIComponent(payload.email)}&mode=registered`,
      );
    },

    onError: (error) => {
      let message = "Terjadi gangguan. Silakan coba lagi.";
      let code: string | undefined;

      if (isAxiosError<ApiErrorResponse>(error)) {
        message =
          error.response?.data.meta?.message ??
          "Pendaftaran gagal. Silakan coba lagi.";

        code = error.response?.data.meta?.code;
      }

      if (code === "EMAIL_SEND_FAILED") {
        router.push(
          `/check-email?email=${encodeURIComponent(
            getValues("email"),
          )}&mode=send-failed`,
        );

        return;
      }

      toast.warning(message);

      setError("root", { message });
    },
  });

  const togglePasswordVisibility = (field: PasswordField) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleRegister = (data: RegisterInput) => {
    clearErrors("root");
    mutate(data);
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(handleRegister),

    visiblePassword,
    togglePasswordVisibility,

    isPendingRegister: isPending,
  };
}
