import { z } from "zod";

import { sanitizeInput } from "@/lib/utils";

export const EmailAuthSchema = z.object({
  email: z
    .string()
    .nonempty()
    .email()
    .max(255, { message: "Email must be at most 255 characters long" })
    .transform((value) => sanitizeInput(value)),
});
