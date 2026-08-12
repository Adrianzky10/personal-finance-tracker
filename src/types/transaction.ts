import { Document, Types } from "mongoose";

export enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
}

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  title: string;
  amount: number;
  type: TransactionType;
  description?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PopulatedCategory {
  _id: string;
  name: string;
  type: TransactionType;
}

export interface ITransactionResponseData {
  id: string;
  categoryId: string;
  category: PopulatedCategory;
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  date: string;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetTransactionResponse {
  meta: {
    success: boolean;
    statusCode: number;
    message: string;
  };
  data: ITransactionResponseData[];
  pagination: Pagination;
}

export interface MutationTransactionResponse {
  meta: {
    success: boolean;
    statusCode: number;
    message: string;
  };
  data: ITransactionResponseData;
}

export interface DeleteTransactionResponse {
  meta: {
    success: boolean;
    statusCode: number;
    message: string;
  };
}
