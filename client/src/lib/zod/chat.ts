import { z } from "zod";
import { sanitizeInput } from "@/lib/utils";

export const ChatSchema = z.object({
  question: z
    .string()
    .min(3)
    .max(1000)
    .trim()
    .refine((value) => value.length > 0, {
      message: "Question must not be empty",
    })
    .transform((value) => sanitizeInput(value)),
});
