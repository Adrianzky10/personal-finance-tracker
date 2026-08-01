import authServices from "@/services/api/auth.service";
import { ApiErrorResponse } from "@/types/apiResponse";
import { LoginInput, loginSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const defaultValues: LoginInput = {
  email: "",
  password: "",
};

export function useLogin() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: (payload: LoginInput) => authServices.login(payload),

    onSuccess: () => {
      reset();

      toast.success("Welcome to FinTrack");

      router.push(callbackUrl);
    },

    onError: (error) => {
      let message = "Terjadi gangguan. Silahkan coba lagi.";

      if (isAxiosError<ApiErrorResponse>(error)) {
        message =
          error.response?.data.meta?.message ??
          "Login gagal, silahkan coba lagi";
      }

      toast.warning(message);
      setError("root", { message });
    },
  });

  const togglePasswordVisibility = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const handleLogin = (data: LoginInput) => {
    clearErrors("root");
    mutateLogin(data);
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(handleLogin),
    isVisiblePassword,
    togglePasswordVisibility,
    isPendingLogin,
  };
}
