import { NextRequest } from "next/server";
import {
  deleteTransaction,
  getTransactionById,
  updateTransaction,
} from "@/services/transaction.service";
import { errorResponse, successResponse } from "@/utils/response";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const data = await getTransactionById(id);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const body = await request.json();

    const data = await updateTransaction(id, body);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

    const data = await deleteTransaction(id);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
