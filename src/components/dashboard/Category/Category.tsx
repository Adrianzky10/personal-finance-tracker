"use client";
import { useState } from "react";
import WelcomeBar from "../WelcomeBar";
import CategoryCard from "./CategoryCard";
import CategoryPagination from "./CategoryPagination";
import { useCategories } from "@/hooks/category/useCategories";
import CategoryDialog from "./CategoryDialog";
import CategorySkeleton from "./CategorySkeleton";
import type { Category } from "@/types/category";

const Category = () => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const { data, isLoading } = useCategories();
  const incomeCategories =
    data?.data.filter((item) => item.type === "income") ?? [];

  const expenseCategories =
    data?.data.filter((item) => item.type === "expense") ?? [];

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenCategoryDialog(true);
  };
  return (
    <main className="flex-1 space-y-6">
      <WelcomeBar
        type="categories"
        title="Manage Categories"
        description="Organize your expenses and income sources into custom categories."
        onCreateCategory={() => {
          setSelectedCategory(null);
          setOpenCategoryDialog(true);
        }}
      />

      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <CategoryCard
              onEdit={handleEditCategory}
              color="success"
              title="Income Categories"
              categories={incomeCategories}
            />

            <CategoryCard
              onEdit={handleEditCategory}
              color="danger"
              title="Expense Categories"
              categories={expenseCategories}
            />
          </div>
          <CategoryPagination />
        </>
      )}

      <CategoryDialog
        open={openCategoryDialog}
        onOpenChange={(value) => {
          setOpenCategoryDialog(value);

          if (!value) {
            setSelectedCategory(null);
          }
        }}
        mode={selectedCategory ? "edit" : "create"}
        categoryData={selectedCategory ?? undefined}
      />
    </main>
  );
};

export default Category;
