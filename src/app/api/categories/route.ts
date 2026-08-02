import { createCategory, getCategories } from "@/services/category.service";
import {
  createdResponse,
  errorResponse,
  paginatedResponse,
} from "@/utils/response";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const category = await createCategory(body);
    return createdResponse(category, "Category created successfully");
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const query = Object.fromEntries(request.nextUrl.searchParams.entries());
    const result = await getCategories(query);

    return paginatedResponse(
      result.data,
      result.pagination,
      "Categories retrieved successfully",
    );
  } catch (error) {
    return errorResponse(error);
  }
}
