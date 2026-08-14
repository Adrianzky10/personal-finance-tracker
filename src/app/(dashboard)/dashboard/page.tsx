import MainDashboard from "@/components/dashboard/MainDashboard/MainDashboard";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/dashboard/MainDashboard/DashboardSkeleton";

export const dynamic = "force-dynamic";

const DashboardPage = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <MainDashboard />
    </Suspense>
  );
};

export default DashboardPage;
