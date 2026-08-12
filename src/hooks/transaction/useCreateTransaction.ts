import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransactionInput } from "@/validations/transaction.validation";
import transactionServices from "@/services/api/transaction.service";
import { queryKeys } from "@/lib/queryKeys";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { ApiErrorResponse } from "@/types/apiResponse";

interface PropTypes {
  onSuccess: () => void;
}

export function useCreateTransaction(props: PropTypes) {
  const { onSuccess } = props;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateTransactionInput) => {
      const { data } = await transactionServices.createTransaction(params);

      return data;
    },

    onSuccess: (response) => {
      toast.success(response.meta?.message);
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
          "Failed to create transaction");

      toast.error(message);
    },
  });
}
