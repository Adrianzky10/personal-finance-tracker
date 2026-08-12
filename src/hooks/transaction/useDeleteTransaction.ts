import { queryKeys } from "@/lib/queryKeys";
import transactionServices from "@/services/api/transaction.service";
import { ApiErrorResponse } from "@/types/apiResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

interface PropTypes {
  onSuccess?: () => void;
}

export function useDeleteTransaction(props: PropTypes) {
  const { onSuccess } = props;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionServices.deleteTransaction(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions(),
      });

      if (onSuccess) {
        onSuccess();
      }
    },

    onError: (error) => {
      const message = !isAxiosError<ApiErrorResponse>(error)
        ? "An error occurred. Please try again."
        : (error.response?.data?.errors?.message ??
          "Failed to delete transaction");

      toast.error(message);
    },
  });
}
