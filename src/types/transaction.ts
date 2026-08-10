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
