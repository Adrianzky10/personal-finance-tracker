import { queryKeys } from "@/lib/queryKeys";
import categoryServices from "@/services/api/category.service";
import { ApiErrorResponse } from "@/types/apiResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

interface PropTypes {
  onSuccess?: () => void;
}

export const useDeleteCategory = (props: PropTypes) => {
  const { onSuccess } = props;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryServices.deleteCategory(id),

    onSuccess: (response) => {
      toast.success(response.data.meta.message);

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
        : (error.response?.data.meta?.message ?? "Failed to delete category.");

      toast.error(message);
    },
  });
};
