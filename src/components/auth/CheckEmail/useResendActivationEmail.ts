"use client";
import { useState, useEffect } from "react";
import authServices from "@/services/api/auth.service";
import { ApiErrorResponse } from "@/types/apiResponse";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export function useResendActivationEmail(email: string) {
  const [cooldown, setCooldown] = useState(0);
  const storageKey = `resend_cooldown_${email}`;

  //Pengecek Riwayat Waktu Mundur
  useEffect(() => {
    const storedExpiry = localStorage.getItem(storageKey);
    if (storedExpiry) {
      const remainingTime = Math.floor(
        (parseInt(storedExpiry) - Date.now()) / 1000,
      );
      if (remainingTime > 0) {
        setTimeout(() => {
          setCooldown(remainingTime);
        }, 0);
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey, setCooldown]);

  //Pengatur Waktu Mundur
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(storageKey);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown, storageKey]);

  const startCooldown = (seconds: number) => {
    setCooldown(seconds);
    localStorage.setItem(storageKey, (Date.now() + seconds * 1000).toString());
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => authServices.resendActivationEmail({ email }),
    onSuccess: () => {
      toast.success("Activation email has been sent");
      startCooldown(240);
    },
    onError: (error) => {
      const message = !isAxiosError<ApiErrorResponse>(error)
        ? "Terjadi gangguan. Silahkan coba lagi."
        : (error.response?.data.meta?.message ??
          "Pendaftaran gagal. Silahkan coba lagi");

      toast.error(message);
      startCooldown(240);
    },
  });

  const handleResendActivationEmail = () => {
    if (cooldown > 0) return;
    mutate();
  };

  return {
    handleResendActivationEmail,
    isPendingResendActivationEmail: isPending,
    cooldown,
  };
}
