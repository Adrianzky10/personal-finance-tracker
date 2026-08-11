import { queryKeys } from "@/lib/queryKeys";
import transactionServices from "@/services/api/transaction.service";
import { UpdateTransactionInput } from "@/validations/transaction.validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PropTypes {
  onSuccess?: () => void;
}

export function useUpdateTransaction(props: PropTypes) {
  const { onSuccess } = props;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateTransactionInput;
    }) => transactionServices.updateTransaction(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.transactions(),
      });

      if (onSuccess) {
        onSuccess();
      }
    },
  });
}
