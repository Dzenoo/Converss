import { z } from "zod";

import { industries, tones } from "@/constants";

export const CreateBotSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessDescription: z.string().min(10, "Please provide a brief description"),
  businessWebsite: z.string().min(10, "Please provide a link to the website"),
  industry: z.enum(industries, { message: "Please select a valid industry" }),
  faqs: z
    .array(
      z.object({
        question: z.string().min(10).max(50),
        answer: z.string().min(30).max(100),
      }),
    )
    .min(1, "Please provide at least one FAQ"),
  tone: z.enum(tones, { message: "Please select a tone" }),
  primaryRole: z.string().min(3),
  greetingMessage: z.string().min(1).max(200),
  fallbackMessage: z.string().min(1).max(200),
});
export type CreateBotValues = z.infer<typeof CreateBotSchema>;

export const UpdateBotSchema = CreateBotSchema.partial();
export type UpdateBotValues = z.infer<typeof UpdateBotSchema>;
