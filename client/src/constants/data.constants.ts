import { IndustryType, ToneType } from "@/types";

export const industries = Object.values(IndustryType) as [string, ...string[]];
export const tones = Object.values(ToneType) as [string, ...string[]];
