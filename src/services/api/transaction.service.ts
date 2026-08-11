import { apiClient } from "@/lib/axios/axios";
import {
  DeleteTransactionResponse,
  GetTransactionResponse,
  MutationTransactionResponse,
} from "@/types/transaction";
import {
  CreateTransactionInput,
  GetTransactionsInput,
  UpdateTransactionInput,
} from "@/validations/transaction.validation";
import apiEndpoint from "./endpoint.constants";

const transactionServices = {
  getTransactions: (params?: GetTransactionsInput) =>
    apiClient.get<GetTransactionResponse>(apiEndpoint.TRANSACTIONS, { params }),

  getTransactionById: (id: string) =>
    apiClient.get<GetTransactionResponse>(`${apiEndpoint.TRANSACTIONS}/${id}`),

  createTransaction: (payload: CreateTransactionInput) =>
    apiClient.post<MutationTransactionResponse>(
      apiEndpoint.TRANSACTIONS,
      payload,
    ),

  updateTransaction: (id: string, payload: UpdateTransactionInput) =>
    apiClient.patch<MutationTransactionResponse>(
      `${apiEndpoint.TRANSACTIONS}/${id}`,
      payload,
    ),

  deleteTransaction: (id: string) =>
    apiClient.delete<DeleteTransactionResponse>(
      `${apiEndpoint.TRANSACTIONS}/${id}`,
    ),
};

export default transactionServices;
