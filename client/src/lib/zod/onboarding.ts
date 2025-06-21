import { z } from "zod";

import { industries, tones } from "@/constants";

export const OnboardingCreateAssistantSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessDescription: z.string().min(10, "Please provide a brief description"),
  industry: z.enum(industries, { message: "Please select a valid industry" }),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1, "Question cannot be empty"),
        answer: z.string().min(1, "Answer cannot be empty"),
      }),
    )
    .min(1, "Please provide at least one FAQ"),
  tone: z.enum(tones, { message: "Please select a tone" }),
  primaryRole: z
    .string()
    .min(
      3,
      "What is the assistant main role? (e.g., answer questions, help bookings)",
    ),
  greetingMessage: z
    .string()
    .min(1, "Greeting message is required")
    .max(200, "Greeting message is too long"),
  fallbackMessage: z
    .string()
    .min(1, "Fallback message is required")
    .max(200, "Fallback message is too long"),
});
