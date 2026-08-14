import MainDashboard from "@/components/dashboard/MainDashboard/MainDashboard";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/dashboard/MainDashboard/DashboardSkeleton";

const DashboardPage = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <MainDashboard />
    </Suspense>
  );
};

export default DashboardPage;
