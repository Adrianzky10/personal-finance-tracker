"use client";
import { queryKeys } from "@/lib/queryKeys";
import categoryServices from "@/services/api/category.service";
import { ApiErrorResponse } from "@/types/apiResponse";
import { CreateCategoryInput } from "@/validations/category.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

interface PropTypes {
  onSuccess?: () => void;
}

export function useCreateCategory(props: PropTypes) {
  const { onSuccess } = props;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCategoryInput) => {
      const { data } = await categoryServices.createCategory(payload);
      return data;
    },

    onSuccess: (response) => {
      toast.success(response.meta?.message);
      queryClient.invalidateQueries({
        queryKey: queryKeys.categories(),
      });

      if (onSuccess) {
        onSuccess();
      }
    },

    onError: (error) => {
      const message = !isAxiosError<ApiErrorResponse>(error)
        ? "An error occurred. Please try again."
        : (error.response?.data.meta?.message ?? "Failed to create category.");

      toast.error(message);
    },
  });
}
