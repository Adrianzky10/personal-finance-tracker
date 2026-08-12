import { ICategory } from "@/types/category";
import { Model, model, models, Schema, Types } from "mongoose";
import { TransactionType as CategoryType } from "@/types/transaction";

const CategorySchema = new Schema<ICategory>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(CategoryType),
      required: true,
    },
  },
  { timestamps: true },
);

CategorySchema.index(
  {
    userId: 1,
    name: 1,
  },
  { unique: true },
);

const Category: Model<ICategory> =
  models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
