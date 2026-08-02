import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "@/services/category.service";
import { errorResponse, successResponse } from "@/utils/response";
import { NextRequest } from "next/server";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const category = await getCategoryById({ id });

    return successResponse(category, "Category retrieved successfully");
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const category = await updateCategory({ id }, body);

    return successResponse(category, "Category updated successfully");
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const category = await deleteCategory({ id });

    console.log(category);

    return successResponse(category, "Category deleted successfully");
  } catch (error) {
    return errorResponse(error);
  }
}
