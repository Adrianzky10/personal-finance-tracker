"use client";

import WelcomeBar from "@/components/shared/WelcomeBar";
import CategoryDialog from "@/components/dashboard/Category/CategoryDialog";
import { useCategoryDialogStore } from "@/stores/useCategoryDialogStore";
import useCurrentUser from "@/hooks/auth/useCurrentUser";

const MainDashboard = () => {
  const { openCreateDialog } = useCategoryDialogStore();
  const { data: user } = useCurrentUser();

  return (
    <main className="flex-1 space-y-6">
      <WelcomeBar
        type="dashboard"
        title={`Welcome back, ${user?.data.name ?? "User"}`}
        description="Here's what's happening with your finances today."
        onCreateCategory={openCreateDialog}
      />

      <CategoryDialog />
    </main>
  );
};

export default MainDashboard;
