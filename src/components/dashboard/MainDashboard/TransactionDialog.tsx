"use client";

import CustomDialog from "@/components/shared/CustomDialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/category/useCategories";
import { useCreateTransaction } from "@/hooks/transaction/useCreateTransaction";
import { useUpdateTransaction } from "@/hooks/transaction/useUpdateTransaction";
import { useTransactionDialogStore } from "@/stores/useTransactionDialogStore";
import { TransactionType } from "@/types/transaction";
import {
  CreateTransactionInput,
  CreateTransactionSchema,
} from "@/validations/transaction.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

type TransactionFormInput = z.input<typeof CreateTransactionSchema>;
type TransactionFormOutput = z.output<typeof CreateTransactionSchema>;

const TransactionDialog = () => {
  const { open, closeDialog, mode, selectedTransaction } =
    useTransactionDialogStore();
  const { data: categoryData } = useCategories();

  const isEdit = mode === "edit";
  const transactionData = selectedTransaction;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<TransactionFormInput, undefined, TransactionFormOutput>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      title: "",
      description: "",

      amount: 0,
      type: undefined,
      categoryId: "",
      date: new Date(),
    },
  });

  const selectedType = useWatch({
    control,
    name: "type",
  });

  const filteredCategories =
    categoryData?.data.filter((category) => category.type === selectedType) ??
    [];

  const createTransaction = useCreateTransaction({
    onSuccess: () => {
      reset();
      closeDialog();
    },
  });

  const updateTransaction = useUpdateTransaction({
    onSuccess: () => {
      reset();
      closeDialog();
    },
  });

  useEffect(() => {
    if (isEdit && transactionData) {
      reset({
        title: transactionData.title,
        description: transactionData.description,
        amount: transactionData.amount,
        type: transactionData.type,
        categoryId: transactionData.categoryId,
        date: new Date(transactionData.date),
      });
    }
  }, [isEdit, transactionData, reset]);

  const onSubmit = (data: CreateTransactionInput) => {
    if (isEdit && transactionData) {
      updateTransaction.mutate({
        id: transactionData.id,
        data,
      });

      return;
    }

    createTransaction.mutate(data as CreateTransactionInput);
  };

  const isPending = createTransaction.isPending || updateTransaction.isPending;

  return (
    <CustomDialog
      open={open}
      onOpenChange={closeDialog}
      title={isEdit ? "Edit Transaction" : "Create Transaction"}
      description={
        isEdit ? "Edit existing transaction" : "Create a new transaction"
      }
      submitText={isEdit ? "Update Transaction" : "Create Transaction"}
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      isSubmitDisabled={isPending || !isDirty}
    >
      <div className="space-y-5">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold tracking-tight text-foreground">
            Title
          </label>

          <Input
            className="h-12 rounded-xl"
            placeholder="e.g. Monthly Salary"
            {...register("title")}
          />

          {errors.title && (
            <p className="text-xs font-medium text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold tracking-tight text-foreground">
            Description
          </label>

          <Input
            className="h-12 rounded-xl"
            placeholder="e.g. Salary for July"
            {...register("description")}
          />

          {errors.description && (
            <p className="text-xs font-medium text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold tracking-tight text-foreground">
            Amount
          </label>

          <Input
            type="number"
            min="0"
            step={1000}
            className="h-12 rounded-xl"
            placeholder="Enter amount"
            {...register("amount", { valueAsNumber: true })}
          />

          {errors.amount && (
            <p className="text-xs font-medium text-destructive">
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold tracking-tight text-foreground">
            Transaction Type
          </label>

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger className="h-12 w-full rounded-xl">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={TransactionType.INCOME}>Income</SelectItem>

                  <SelectItem value={TransactionType.EXPENSE}>
                    Expense
                  </SelectItem>
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

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold tracking-tight text-foreground">
            Category
          </label>

          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!selectedType}
              >
                <SelectTrigger className="h-12 w-full rounded-xl">
                  <SelectValue
                    placeholder={
                      selectedType
                        ? "Select category"
                        : "Select transaction type first"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.categoryId && (
            <p className="text-xs font-medium text-destructive">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold tracking-tight text-foreground">
            Date
          </label>

          <Input
            type="date"
            className="h-12 rounded-xl"
            {...register("date")}
          />

          {errors.date && (
            <p className="text-xs font-medium text-destructive">
              {errors.date.message}
            </p>
          )}
        </div>
      </div>
    </CustomDialog>
  );
};

export default TransactionDialog;
