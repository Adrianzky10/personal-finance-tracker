"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateCategoryInput,
  CreateCategorySchema,
} from "@/validations/category.validation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCategory } from "@/hooks/category/useCreateCategory";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useUpdateCategory } from "@/hooks/category/useUpdateCategory";
import { useCategoryDialogStore } from "@/stores/useCategoryDialogStore";

const CategoryDialog = () => {
  const { open, mode, selectedCategory, closeDialog } =
    useCategoryDialogStore();
  const isEdit = mode === "edit";
  const categoryData = selectedCategory;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<CreateCategoryInput>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      type: undefined,
    },
  });

  const createCategory = useCreateCategory({
    onSuccess: () => {
      reset();
      closeDialog();
    },
  });

  const updateCategory = useUpdateCategory({
    onSuccess: () => {
      reset();
      closeDialog();
    },
  });

  const onSubmit = (data: CreateCategoryInput) => {
    if (isEdit && categoryData) {
      updateCategory.mutate({
        id: categoryData.id,
        data,
      });

      return;
    }
    createCategory.mutate(data);
  };

  useEffect(() => {
    if (isEdit && categoryData) {
      reset({
        name: categoryData.name,
        type: categoryData.type,
      });
    } else {
      reset({
        name: "",
        type: undefined,
      });
    }
  }, [isEdit, categoryData, reset]);

  const isPending = createCategory.isPending || updateCategory.isPending;

  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) closeDialog(); }}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-3xl border bg-card ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="space-y-2 border-b px-6 py-5 text-left">
            <DialogTitle className="text-xl font-bold tracking-tight">
              {isEdit ? "Edit Category" : "Create Category"}
            </DialogTitle>

            <DialogDescription className="text-sm leading-6 text-muted-foreground">
              {isEdit
                ? "Update your category information."
                : "Create a new category to organize your transactions."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8 px-6 py-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-tight text-foreground">
                Category Name
              </label>

              <Input
                className="h-12 rounded-xl"
                disabled={isPending}
                placeholder="e.g. Food, Salary, Investment"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-xs font-medium text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-tight text-foreground">
                Category Type
              </label>

              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    disabled={isPending}
                    value={field.value ?? ""}
                    onValueChange={(value) =>
                      field.onChange(value as CreateCategoryInput["type"])
                    }
                  >
                    <SelectTrigger className="h-12 w-full rounded-xl py-6">
                      <SelectValue placeholder="Select category type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.type && (
                <p className="text-xs font-medium text-destructive">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-3 border-t px-6 py-5 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={closeDialog}
              className="h-11 rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending || !isDirty}
              className="h-11 rounded-xl"
            >
              <>
                {isPending && <Spinner className="mr-2 h-4 w-4 animate-spin" />}

                {isPending
                  ? "Submitting..."
                  : isEdit
                    ? "Save Changes"
                    : "Create Category"}
              </>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
