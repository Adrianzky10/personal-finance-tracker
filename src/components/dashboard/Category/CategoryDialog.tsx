"use client";

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
import { useEffect } from "react";
import { useUpdateCategory } from "@/hooks/category/useUpdateCategory";
import { useCategoryDialogStore } from "@/stores/useCategoryDialogStore";
import CustomDialog from "@/components/shared/CustomDialog";

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
    <CustomDialog
      open={open}
      onOpenChange={closeDialog}
      title={isEdit ? "Edit Category" : "Create Category"}
      description={
        isEdit
          ? "Update your category information."
          : "Create a new category to organize your transactions."
      }
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      isSubmitDisabled={!isDirty}
      submitText={isEdit ? "Save Changes" : "Create Category"}
    >
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
    </CustomDialog>
  );
};

export default CategoryDialog;
