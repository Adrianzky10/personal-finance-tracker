import { forgotPassword } from "@/services/auth.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await forgotPassword(body);

    return successResponse(result, result.message);
  } catch (error) {
    return errorResponse(error);
  }
}
