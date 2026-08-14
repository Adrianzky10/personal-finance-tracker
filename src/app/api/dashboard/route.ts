import { NextRequest } from "next/server";
import { getDashboard } from "@/services/dashboard.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(
      request.nextUrl.searchParams.entries(),
    );

    const data = await getDashboard(searchParams);

    return successResponse(data, "Dashboard data retrieved successfully");
  } catch (error) {
    return errorResponse(error);
  }
}
