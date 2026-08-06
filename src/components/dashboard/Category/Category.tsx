"use client";
import { useState } from "react";
import WelcomeBar from "../WelcomeBar";
import CategoryCard from "./CategoryCard";
import CategoryPagination from "./CategoryPagination";
import { useCategories } from "@/hooks/category/useCategories";
import CategoryDialog from "./CategoryDialog";
import CategorySkeleton from "./CategorySkeleton";
import type { Category } from "@/types/category";
import { useDeleteCategory } from "@/hooks/category/useDeleteCategory";
import DeleteDialog from "@/components/shared/DeleteDialog";

const Category = () => {
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { data, isLoading } = useCategories();
  const incomeCategories =
    data?.data.filter((item) => item.type === "income") ?? [];

  const expenseCategories =
    data?.data.filter((item) => item.type === "expense") ?? [];

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenCategoryDialog(true);
  };

  const deleteCategory = useDeleteCategory({
    onSuccess: () => {
      setOpenDeleteDialog(false);
      setSelectedCategory(null);
    },
  });

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
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
              onDelete={handleDeleteCategory}
            />

            <CategoryCard
              onEdit={handleEditCategory}
              color="danger"
              title="Expense Categories"
              categories={expenseCategories}
              onDelete={handleDeleteCategory}
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

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => {
          setOpenDeleteDialog(open);

          if (!open) {
            setSelectedCategory(null);
          }
        }}
        title="Delete Category"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedCategory?.name}</span>?
            This action cannot be undone.
          </>
        }
        loading={deleteCategory.isPending}
        onDelete={() => {
          if (!selectedCategory) return;

          deleteCategory.mutate(selectedCategory.id);
        }}
      />
    </main>
  );
};

export default Category;
