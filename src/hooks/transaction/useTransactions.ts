import { queryKeys } from "@/lib/queryKeys";
import transactionServices from "@/services/api/transaction.service";
import { GetTransactionsInput } from "@/validations/transaction.validation";
import { useQuery } from "@tanstack/react-query";

export function useTransactions(params?: GetTransactionsInput) {
  return useQuery({
    queryKey: queryKeys.transactions(params),

    queryFn: async () => {
      const { data } = await transactionServices.getTransactions(params);

      return data;
    },
  });
}
