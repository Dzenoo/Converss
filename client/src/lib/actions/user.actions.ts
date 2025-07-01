import { getApiHandler } from "../api";
import { IUser } from "@/types";

export const getCurrentUser = async (data: {
  token: string;
}): Promise<
  ServerResponse<{
    data: {
      isOnboarding: boolean;
      onboardingCompleted: boolean;
    };
  }>
> =>
  getApiHandler("user", {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

export const getUserDashboard = async (data: {
  token: string;
}): Promise<
  ServerResponse<{
    data: {
      user: IUser;
      summary: {
        totalBots: number;
        activeBots: number;
        totalConversations: number;
        messagesThisMonth: number;
      };
      recentActivity: {
        _id: string;
        content: string;
        role: "user" | "assistant";
        timestamp: string;
        botName: string;
        botId: string;
        widgetId: string;
      }[];
      botPerformance: {
        id: string;
        name: string;
        isActive: boolean;
        conversations: number;
        lastActive: Date;
        widgetId: string;
      }[];
      topQuestions: { question: string; count: number; lastAsked: string }[];
    };
  }>
> =>
  getApiHandler("dashboard/user", {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
