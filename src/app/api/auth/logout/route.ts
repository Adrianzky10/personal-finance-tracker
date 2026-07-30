import { clearAuthCookie } from "@/lib/cookies";
import { logout } from "@/services/auth.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function POST() {
  try {
    const result = await logout();

    const response = successResponse(result, result.message);

    clearAuthCookie(response);

    return response;
  } catch (error) {
    return errorResponse(error);
  }
}
