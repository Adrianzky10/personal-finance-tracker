import { TransactionType } from "@/types/transaction";
import { z } from "zod";

export const TransactionTypeSchema = z.enum([
  TransactionType.EXPENSE,
  TransactionType.INCOME,
]);

export const CreateTransactionSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),

  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .optional(),

  amount: z
    .string()
    .refine((value) => parseFloat(value) > 0, {
      message: "Amount must be greater than 0",
    })
    .transform((value) => parseFloat(value)),

  type: TransactionTypeSchema,

  date: z.coerce.date({
    message: "Invalid transaction date",
  }),
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

export const GetTransactionsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  type: TransactionTypeSchema.optional(),

  categoryId: z.string().trim().optional(),

  sortBy: z.enum(["date", "amount", "title", "createdAt"]).default("date"),

  order: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateTransactionInput = z.infer<typeof CreateTransactionSchema>;

export type UpdateTransactionInput = z.infer<typeof UpdateTransactionSchema>;

export type GetTransactionsInput = z.infer<typeof GetTransactionsSchema>;
