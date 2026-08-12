import { AppError } from "@/exceptions/AppError";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { QueryFilter, Types } from "mongoose";
import Category from "@/models/Category";
import {
  CategoryIdInput,
  CategoryIdSchema,
  CreateCategoryInput,
  CreateCategorySchema,
  GetCategoriesSchema,
  UpdateCategoryInput,
  UpdateCategorySchema,
} from "@/validations/category.validation";
import { ICategory } from "@/types/category";
import Transaction from "@/models/Transaction";

export async function createCategory(data: CreateCategoryInput) {
  await connectDB();
  const user = await requireAuth();

  const validateData = CreateCategorySchema.parse(data);
  const { name, type } = validateData;

  const existingCategory = await Category.findOne({
    userId: user._id,
    name,
  });

  if (existingCategory) {
    throw new AppError("Category already exist", 409);
  }

  const category = await Category.create({
    userId: user._id,
    name: name,
    type: type,
  });

  return {
    id: category._id.toString(),
    name: category.name,
    type: category.type,
  };
}

export async function getCategories(query: unknown) {
  await connectDB();
  const user = await requireAuth();

  const validatedData = GetCategoriesSchema.parse(query);

  const { page, limit, search, type, sortBy, order } = validatedData;

  const skip = (page - 1) * limit;

  const filter: QueryFilter<ICategory> = {
    userId: user._id,
  };

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (type) {
    filter.type = type;
  }

  const sort: Record<string, 1 | -1> = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const total = await Category.countDocuments(filter);

  const categories = await Category.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const data = categories.map((category) => ({
    id: category._id.toString(),
    name: category.name,
    type: category.type,
  }));

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

export async function getCategoryById(params: CategoryIdInput) {
  await connectDB();
  const user = await requireAuth();

  const { id } = CategoryIdSchema.parse(params);

  const category = await Category.findOne({
    userId: user._id,
    _id: new Types.ObjectId(id),
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return {
    id: category._id.toString(),
    name: category.name,
    type: category.type,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export async function updateCategory(
  params: CategoryIdInput,
  data: UpdateCategoryInput,
) {
  await connectDB();

  const user = await requireAuth();
  const { id } = CategoryIdSchema.parse(params);
  const validatedData = UpdateCategorySchema.parse(data);

  const category = await Category.findOne({
    _id: new Types.ObjectId(id),
    userId: user._id,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (
    validatedData.name !== undefined &&
    validatedData.name.toLowerCase() !== category.name.toLowerCase()
  ) {
    const existingCategory = await Category.findOne({
      userId: user._id,
      name: {
        $regex: validatedData.name,
        $options: "i",
      },
      _id: {
        $ne: new Types.ObjectId(id),
      },
    });

    if (existingCategory) {
      throw new AppError("Category name already exist", 409);
    }

    category.name = validatedData.name;
  }

  if (validatedData.type !== undefined) {
    category.type = validatedData.type;
  }

  await category.save();

  return {
    id: category._id.toString(),
    name: category.name,
    type: category.type,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}
export async function deleteCategory(params: CategoryIdInput) {
  await connectDB();
  const user = await requireAuth();

  const { id } = CategoryIdSchema.parse(params);

  const category = await Category.findOne({
    _id: new Types.ObjectId(id),
    userId: user._id,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const transactionExists = await Transaction.exists({
    categoryId: category._id,
    userId: user._id,
  });

  if (transactionExists) {
    throw new AppError(
      "Category cannot be deleted because it is being used by transactions",
      409,
    );
  }

  await category.deleteOne();
}
