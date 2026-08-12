"use client";

import WelcomeBar from "@/components/shared/WelcomeBar";
import TransactionChart from "./TransactionChart";
import TransactionSummary from "./TransactionSummary";
import TransactionTable from "./TransactionTable";

import { useCategoryDialogStore } from "@/stores/useCategoryDialogStore";
import CategoryDialog from "../Category/CategoryDialog";
import useTransaction from "@/hooks/transaction/useTransaction";
import TransactionDialog from "./TransactionDialog";
import { useTransactionDialogStore } from "@/stores/useTransactionDialogStore";
import { useState } from "react";
import { ITransactionResponseData } from "@/types/transaction";
import { useDeleteTransaction } from "@/hooks/transaction/useDeleteTransaction";
import DeleteDialog from "@/components/shared/DeleteDialog";

export default function Transaction() {
  const { openCreateDialog: openCreateCategoryDialog } =
    useCategoryDialogStore();
  const {
    openCreateDialog: openCreateTransactionDialog,
    openEditDialog: openEditTransactionDialog,
  } = useTransactionDialogStore();

  const {
    data,
    currentPage,
    handleChangePage,
    handleSearch,
    currentType,
    handleChangeType,
  } = useTransaction();

  const transactions = data?.data ?? [];

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [transactionForDelete, setTransactionForDelete] =
    useState<ITransactionResponseData | null>(null);

  const deleteTransaction = useDeleteTransaction({
    onSuccess: () => {
      setOpenDeleteDialog(false);
      setTransactionForDelete(null);
    },
  });

  const handleDeleteTransaction = (transaction: ITransactionResponseData) => {
    setTransactionForDelete(transaction);
    setOpenDeleteDialog(true);
  };

  return (
    <div className="space-y-6">
      <WelcomeBar
        type="dashboard"
        title="Financial Overview"
        description="Here's what's happening with your finances today."
        onCreateCategory={openCreateCategoryDialog}
        onCreateTransaction={openCreateTransactionDialog}
      />

      <TransactionSummary totalIncome={0} totalExpense={0} balance={0} />

      <TransactionChart data={[]} />

      <TransactionTable
        transactions={transactions}
        onEdit={openEditTransactionDialog}
        onDelete={handleDeleteTransaction}
        // pagination
        totalPages={data?.pagination?.totalPages ?? 0}
        currentPage={currentPage}
        onChangePage={handleChangePage}
        //search
        onChangeSearch={handleSearch}
        // filter
        currentType={currentType}
        onChangeType={handleChangeType}
      />

      <CategoryDialog />

      <TransactionDialog />

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => {
          setOpenDeleteDialog(open);

          if (!open) {
            setTransactionForDelete(null);
          }
        }}
        title="Delete Transaction"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{transactionForDelete?.title}</span>
            ? This action cannot be undone.
          </>
        }
        loading={deleteTransaction.isPending}
        onDelete={() => {
          if (!transactionForDelete) return;

          deleteTransaction.mutate(transactionForDelete.id);
        }}
      />
    </div>
  );
}
