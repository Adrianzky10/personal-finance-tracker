"use client";
import { useState } from "react";
import WelcomeBar from "../WelcomeBar";
import CategoryCard from "./CategoryCard";
import CategoryPagination from "./CategoryPagination";
import { useCategories } from "@/hooks/category/useCategories";
import CategoryDialog from "./CategoryDialog";

const Category = () => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const { data } = useCategories();
  const incomeCategories =
    data?.data.filter((item) => item.type === "income") ?? [];

  const expenseCategories =
    data?.data.filter((item) => item.type === "expense") ?? [];
  return (
    <main className="flex-1 space-y-6">
      <WelcomeBar
        type="categories"
        title="Manage Categories"
        description="Organize your expenses and income sources into custom categories."
        onCreateCategory={() => setOpenCategoryDialog(true)}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryCard
          color="success"
          title="Income Categories"
          categories={incomeCategories}
        />

        <CategoryCard
          color="danger"
          title="Expense Categories"
          categories={expenseCategories}
        />
      </div>
      <CategoryPagination />

      <CategoryDialog
        open={openCategoryDialog}
        onOpenChange={setOpenCategoryDialog}
        mode="create"
      />
    </main>
  );
};

export default Category;
