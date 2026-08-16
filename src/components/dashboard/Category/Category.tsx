"use client";
import { useState } from "react";
import CategoryCard from "./CategoryCard";
import { useCategories } from "@/hooks/category/useCategories";
import CategoryDialog from "./CategoryDialog";
import CategorySkeleton from "./CategorySkeleton";
import type { Category } from "@/types/category";
import { useDeleteCategory } from "@/hooks/category/useDeleteCategory";
import DeleteDialog from "@/components/shared/DeleteDialog";
import WelcomeBar from "@/components/shared/WelcomeBar";
import { useCategoryDialogStore } from "@/stores/useCategoryDialogStore";

const Category = () => {
  const { openCreateDialog, openEditDialog } = useCategoryDialogStore();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const { data, isLoading } = useCategories();
  const incomeCategories =
    data?.data.filter((item) => item.type === "income") ?? [];

  const expenseCategories =
    data?.data.filter((item) => item.type === "expense") ?? [];

  const deleteCategory = useDeleteCategory({
    onSuccess: () => {
      setOpenDeleteDialog(false);
      setDeleteTarget(null);
    },
  });

  const handleDeleteCategory = (category: Category) => {
    setDeleteTarget(category);
    setOpenDeleteDialog(true);
  };

  return (
    <main className="flex-1 space-y-6">
      <WelcomeBar
        type="categories"
        title="Manage Categories"
        description="Organize your expenses and income sources into custom categories."
        onCreateCategory={openCreateDialog}
      />

      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <CategoryCard
              onEdit={openEditDialog}
              color="success"
              title="Income Categories"
              categories={incomeCategories}
              onDelete={handleDeleteCategory}
            />

            <CategoryCard
              onEdit={openEditDialog}
              color="danger"
              title="Expense Categories"
              categories={expenseCategories}
              onDelete={handleDeleteCategory}
            />
          </div>
        </>
      )}

      <CategoryDialog />

      <DeleteDialog
        open={openDeleteDialog}
        onOpenChange={(open) => {
          setOpenDeleteDialog(open);

          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Delete Category"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{deleteTarget?.name}</span>? This
            action cannot be undone.
          </>
        }
        loading={deleteCategory.isPending}
        onDelete={() => {
          if (!deleteTarget) return;

          deleteCategory.mutate(deleteTarget.id);
        }}
      />
    </main>
  );
};

export default Category;
