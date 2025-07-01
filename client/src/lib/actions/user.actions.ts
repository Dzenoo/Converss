import { getApiHandler } from "../api";

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
      summary: {
        totalBots: number;
        activeBots: number;
        totalConversations: number;
        messagesThisMonth: number;
      };
      recentActivity: {
        _id: string;
        date: string;
        user: number;
        assistant: number;
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
