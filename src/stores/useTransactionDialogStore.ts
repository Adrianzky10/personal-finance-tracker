import { create } from "zustand";
import type { ITransactionResponseData } from "@/types/transaction";

type TransactionDialogStore = {
  open: boolean;
  mode: "create" | "edit";
  selectedTransaction: ITransactionResponseData | null;

  openCreateDialog: () => void;
  openEditDialog: (transaction: ITransactionResponseData) => void;
  closeDialog: () => void;
};

export const useTransactionDialogStore = create<TransactionDialogStore>(
  (set) => ({
    open: false,
    mode: "create",
    selectedTransaction: null,

    openCreateDialog: () =>
      set({
        open: true,
        mode: "create",
        selectedTransaction: null,
      }),

    openEditDialog: (transaction) =>
      set({
        open: true,
        mode: "edit",
        selectedTransaction: transaction,
      }),

    closeDialog: () =>
      set({
        open: false,
        selectedTransaction: null,
      }),
  }),
);
