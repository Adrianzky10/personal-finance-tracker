import { AppError } from "@/exceptions/AppError";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Transaction from "@/models/Transaction";
import { ITransaction, PopulatedCategory } from "@/types/transaction";
import {
  CreateTransactionInput,
  CreateTransactionSchema,
  GetTransactionsSchema,
  UpdateTransactionSchema,
} from "@/validations/transaction.validation";
import { QueryFilter } from "mongoose";

export async function createTransaction(data: CreateTransactionInput) {
  await connectDB();

  const user = await requireAuth();

  const validatedData = CreateTransactionSchema.parse(data);

  const { categoryId, title, description, amount, type, date } = validatedData;

  const category = await Category.findOne({
    _id: categoryId,
    userId: user._id,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (category.type !== type) {
    throw new AppError("Transaction type must match category type", 400);
  }

  const transaction = await Transaction.create({
    userId: user._id,
    categoryId,
    title,
    description,
    amount,
    type,
    date,
  });

  return {
    id: transaction._id.toString(),
    categoryId: transaction.categoryId.toString(),
    title: transaction.title,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    date: transaction.date,
    createdAt: transaction.createdAt,
  };
}

export async function getTransactions(query: unknown) {
  await connectDB();

  const user = await requireAuth();

  const validatedData = GetTransactionsSchema.parse(query);

  const { page, limit, search, type, categoryId, sortBy, order } =
    validatedData;

  const skip = (page - 1) * limit;

  const filter: QueryFilter<ITransaction> = {
    userId: user._id,
  };

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (type) {
    filter.type = type;
  }

  if (categoryId) {
    filter.categoryId = categoryId;
  }

  const sort: Record<string, 1 | -1> = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const [total, transactions] = await Promise.all([
    Transaction.countDocuments(filter),

    Transaction.find(filter)
      .populate("categoryId", "name type")
      .sort(sort)
      .skip(skip)
      .limit(limit),
  ]);

  const data = transactions.map((transaction) => {
    const populatedCategory =
      typeof transaction.categoryId === "object" &&
      "name" in transaction.categoryId
        ? (transaction.categoryId as unknown as PopulatedCategory)
        : null;

    return {
      id: transaction._id.toString(),
      categoryId: populatedCategory
        ? populatedCategory._id.toString()
        : transaction.categoryId.toString(),
      category: populatedCategory
        ? {
            id: populatedCategory._id.toString(),
            name: populatedCategory.name,
            type: populatedCategory.type,
          }
        : null,
      title: transaction.title,
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  });

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getTransactionById(id: string) {
  await connectDB();

  const user = await requireAuth();

  const transaction = await Transaction.findOne({
    _id: id,
    userId: user._id,
  }).populate("categoryId", "name type");

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  const populatedCategory =
    typeof transaction.categoryId === "object" &&
    "name" in transaction.categoryId
      ? (transaction.categoryId as unknown as PopulatedCategory)
      : null;

  return {
    id: transaction._id.toString(),

    categoryId: populatedCategory
      ? populatedCategory._id.toString()
      : transaction.categoryId.toString(),

    category: populatedCategory
      ? {
          id: populatedCategory._id.toString(),
          name: populatedCategory.name,
          type: populatedCategory.type,
        }
      : null,

    title: transaction.title,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    date: transaction.date,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
}

export async function updateTransaction(id: string, payload: unknown) {
  await connectDB();

  const user = await requireAuth();

  const validatedData = UpdateTransactionSchema.parse(payload);

  const transaction = await Transaction.findOne({
    _id: id,
    userId: user._id,
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  if (validatedData.categoryId) {
    const category = await Category.findOne({
      _id: validatedData.categoryId,
      userId: user._id,
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }
  }

  Object.assign(transaction, validatedData);

  await transaction.save();

  await transaction.populate("categoryId", "name type");

  const populatedCategory =
    typeof transaction.categoryId === "object" &&
    "name" in transaction.categoryId
      ? (transaction.categoryId as unknown as PopulatedCategory)
      : null;

  return {
    id: transaction._id.toString(),

    categoryId: populatedCategory
      ? populatedCategory._id.toString()
      : transaction.categoryId.toString(),

    category: populatedCategory
      ? {
          id: populatedCategory._id.toString(),
          name: populatedCategory.name,
          type: populatedCategory.type,
        }
      : null,

    title: transaction.title,
    description: transaction.description,
    amount: transaction.amount,
    type: transaction.type,
    date: transaction.date,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
}

export async function deleteTransaction(id: string) {
  await connectDB();

  const user = await requireAuth();

  const transaction = await Transaction.findOneAndDelete({
    _id: id,
    userId: user._id,
  });

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  return {
    id: transaction._id.toString(),
  };
}
