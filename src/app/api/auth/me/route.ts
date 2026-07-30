import { getCurrentUserProfile } from "@/services/auth.service";
import { errorResponse, successResponse } from "@/utils/response";

export async function GET() {
  try {
    const user = await getCurrentUserProfile();

    return successResponse(user, "Current user fetched successfully");
  } catch (error) {
    return errorResponse(error);
  }
}
