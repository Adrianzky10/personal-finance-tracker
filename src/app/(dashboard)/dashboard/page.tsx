import WelcomeBar from "@/components/dashboard/WelcomeBar";
import React from "react";

const DashboardPage = () => {
  return (
    <main>
      <WelcomeBar
        type="dashboard"
        title="Financial Overview"
        description="Track your daily incomes and expenses efficiently."
      />
    </main>
  );
};

export default DashboardPage;
