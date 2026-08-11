"use client";

import WelcomeBar from "@/components/shared/WelcomeBar";
import TransactionChart from "./TransactionChart";
import TransactionSummary from "./TransactionSummary";
import TransactionTable from "./TransactionTable";

import useCurrentUser from "@/hooks/auth/useCurrentUser";
import { useCategoryDialogStore } from "@/stores/useCategoryDialogStore";
import CategoryDialog from "../Category/CategoryDialog";
import useTransaction from "@/hooks/transaction/useTransaction";

export default function Transaction() {
  const { openCreateDialog } = useCategoryDialogStore();

  const { data: user, isLoading: isLoadingUser } = useCurrentUser();

  const { data } = useTransaction();

  const transactions = data?.data ?? [];

  return (
    <div className="space-y-6">
      <WelcomeBar
        type="dashboard"
        title={
          isLoadingUser
            ? "Welcome back, User"
            : `Welcome back, ${user?.data.name ?? "User"}`
        }
        description="Here's what's happening with your finances today."
        onCreateCategory={openCreateDialog}
      />

      <TransactionSummary totalIncome={0} totalExpense={0} balance={0} />

      <TransactionChart data={[]} />

      <TransactionTable transactions={transactions} />

      <CategoryDialog />
    </div>
  );
}
