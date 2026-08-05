import WelcomeBar from "@/components/dashboard/WelcomeBar";
import React from "react";

const CategoryPage = () => {
  return (
    <main>
      <WelcomeBar
        type="categories"
        title="Manage Categories"
        description="Organize your expenses and income sources into custom categories."
      />
    </main>
  );
};

export default CategoryPage;
