import { Document, Types } from "mongoose";

export enum CategoryType {
  EXPENSE = "expense",
  INCOME = "income",
}

export interface ICategory extends Document {
  userId: Types.ObjectId;
  name: string;
  type: CategoryType;
  createdAt: Date;
  updatedAt: Date;
}
