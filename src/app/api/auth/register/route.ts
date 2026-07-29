import { register } from "@/services/auth.service";
import { createdResponse, errorResponse } from "@/utils/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await register(body);

    return createdResponse(
      result,
      "Registration successful. Please check your email to activate your account.",
    );
  } catch (error) {
    return errorResponse(error);
  }
}
