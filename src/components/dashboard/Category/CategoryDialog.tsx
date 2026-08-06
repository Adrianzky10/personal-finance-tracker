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

type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
};

const CategoryDialog = ({
  open,
  onOpenChange,
  mode = "create",
}: CategoryDialogProps) => {
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
      onOpenChange(false);
    },
  });

  const onSubmit = (data: CreateCategoryInput) => {
    createCategory.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Edit Category" : "Create Category"}
            </DialogTitle>

            <DialogDescription>
              {isEdit
                ? "Update your category information."
                : "Create a new category to organize your transactions."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Name</label>

              <Input
                placeholder="e.g. Food, Salary, Investment"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category Type</label>

              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={(value) =>
                      field.onChange(value as CreateCategoryInput["type"])
                    }
                  >
                    <SelectTrigger className="w-full">
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
                <p className="text-sm text-destructive">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button type="submit" disabled={createCategory.isPending}>
              {createCategory.isPending && (
                <Spinner className="ml-2 h-4 w-4 animate-spin" />
              )}
              {createCategory.isPending
                ? "Submitting..."
                : isEdit
                  ? "Save Changes"
                  : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
