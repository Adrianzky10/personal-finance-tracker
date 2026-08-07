import Navigation from "@/components/dashboard/Navigation";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />

      <div className="mx-auto flex min-h-full max-w-7xl w-full flex-col px-6 pb-12 pt-6 lg:gap-6">
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
