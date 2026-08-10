import { NextRequest } from "next/server";
import {
  createTransaction,
  getTransactions,
} from "@/services/transaction.service";
import {
  createdResponse,
  errorResponse,
  paginatedResponse,
} from "@/utils/response";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(
      request.nextUrl.searchParams.entries(),
    );

    const result = await getTransactions(searchParams);

    return paginatedResponse(result.data, result.pagination);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = await createTransaction(body);

    return createdResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
