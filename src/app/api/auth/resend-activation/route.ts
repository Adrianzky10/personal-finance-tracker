import { resendActivationEmail } from "@/services/auth.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await resendActivationEmail(body);

    return successResponse(result, "Activation email sent successfully");
  } catch (error) {
    return errorResponse(error);
  }
}
