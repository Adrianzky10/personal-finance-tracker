import { verifyEmail } from "@/services/auth.service";
import { createdResponse, errorResponse } from "@/utils/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await verifyEmail(body);

    return createdResponse(result, "Email verified successfully");
  } catch (error) {
    return errorResponse(error);
  }
}
