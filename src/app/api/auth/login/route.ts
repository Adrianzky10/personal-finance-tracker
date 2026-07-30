import { setAuthCookie } from "@/lib/cookies";
import { login } from "@/services/auth.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await login(body);

    const response = successResponse(result.user, "Login successfully");

    setAuthCookie(response, result.token);

    return response;
  } catch (error) {
    return errorResponse(error);
  }
}
