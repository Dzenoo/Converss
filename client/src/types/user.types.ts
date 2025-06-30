import { User } from "@clerk/nextjs/server";
import { IBot } from "@/types";

export interface IUser extends User {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
  isOnboarding: boolean;
  onboardingCompleted: boolean;
  bots: Array<IBot>;
}
