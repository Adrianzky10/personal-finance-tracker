import { Document, Types } from "mongoose";

// Re-use TransactionType to avoid duplicate enums with the same values.
// Aliased as CategoryType for backward compatibility.
import { TransactionType } from "./transaction";

// for backend
export interface ICategory extends Document {
  userId: Types.ObjectId;
  name: string;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

//for frontend
export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  createdAt: string;
  updatedAt: string;
}

export type GetCategoriesResponse = {
  meta: {
    success: boolean;
    statusCode: number;
    message: string;
  };
  data: Category[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
