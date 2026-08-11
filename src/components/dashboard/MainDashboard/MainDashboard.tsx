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

export default function Transaction() {
  const { openCreateDialog: openCreateCategoryDialog } =
    useCategoryDialogStore();
  const { openCreateDialog: openCreateTransactionDialog } =
    useTransactionDialogStore();

  const { data } = useTransaction();

  const transactions = data?.data ?? [];

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

      <TransactionTable transactions={transactions} />

      <CategoryDialog />

      <TransactionDialog />
    </div>
  );
}
