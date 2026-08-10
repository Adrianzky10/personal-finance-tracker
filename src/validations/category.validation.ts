import { TransactionType } from "@/types/transaction";
import { z } from "zod";

// Re-use TransactionType to avoid duplicate enums with the same values.
const CategoryType = TransactionType;

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name must be at most 50 characters"),

  type: z.enum(CategoryType),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name must be at most 50 characters")
    .optional(),

  type: z.enum(CategoryType).optional(),
});

export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;

export const GetCategoriesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(100),
  search: z.string().trim().optional(),
  type: z.enum(CategoryType).optional(),
  sortBy: z.enum(["name", "createdAt", "updatedAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export type GetCategoriesInput = z.infer<typeof GetCategoriesSchema>;

export const CategoryIdSchema = z.object({
  id: z.string().trim().min(1, "Invalid category ID"),
});

export type CategoryIdInput = z.infer<typeof CategoryIdSchema>;
