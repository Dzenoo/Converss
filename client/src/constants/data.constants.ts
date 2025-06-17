import { IndustryType, ToneType } from "@/types";
import { Briefcase, Crown, Heart, Palette, Smile, Users } from "lucide-react";

// RAW DATA EXTRACTED FROM ENUMS. GOOD FOR ZOD OR JUST DISPLAYING DATA
export const industries = Object.values(IndustryType) as [string, ...string[]];
export const tones = Object.values(ToneType) as [string, ...string[]];

export const AssistantTonesData = [
  {
    id: 1,
    label: "Friendly",
    icon: Smile,
    description:
      "Warm, casual, and conversational—like chatting with a helpful friend.",
  },
  {
    id: 2,
    label: "Professional",
    icon: Briefcase,
    description:
      "Clear and businesslike — polite and efficient without being cold.",
  },
  {
    id: 3,
    label: "Formal",
    icon: Crown,
    description:
      "Polite, structured, and respectful — ideal for law, finance, or high-trust areas.",
  },
  {
    id: 4,
    label: "Funny",
    icon: Users,
    description:
      "Light-hearted, quirky, and playful — perfect for brands with personality.",
  },
  {
    id: 5,
    label: "Empathetic",
    icon: Heart,
    description:
      "Kind, understanding, and caring — great for support-focused interactions.",
  },
  {
    id: 6,
    label: "Supportive",
    icon: Palette,
    description:
      "Encouraging, reassuring, and positive — helps users feel confident and understood.",
  },
];
