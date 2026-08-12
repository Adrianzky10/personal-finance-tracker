import MainDashboard from "@/components/dashboard/MainDashboard/MainDashboard";
import { Suspense } from "react";

const DashboardPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainDashboard />
    </Suspense>
  );
};

export default DashboardPage;
