import { z } from "zod";

export const GetDashboardSchema = z.object({
  months: z.coerce.number().int().min(1).max(12).default(6),
});

export type GetDashboardInput = z.input<typeof GetDashboardSchema>;
