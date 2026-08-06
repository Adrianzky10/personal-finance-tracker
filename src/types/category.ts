import { Document, Types } from "mongoose";

export enum CategoryType {
  EXPENSE = "expense",
  INCOME = "income",
}

// for backend
export interface ICategory extends Document {
  userId: Types.ObjectId;
  name: string;
  type: CategoryType;
  createdAt: Date;
  updatedAt: Date;
}

//for frontend
export interface Category {
  id: string;
  name: string;
  type: CategoryType;
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
