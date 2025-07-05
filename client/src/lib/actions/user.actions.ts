import { getApiHandler } from "../api";

export const getCurrentUser = async (): Promise<
  ServerResponse<{
    data: {
      isOnboarding: boolean;
      onboardingCompleted: boolean;
    };
  }>
> => getApiHandler("user");

export const getUserDashboard = async (): Promise<
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
        lastActive: string;
        widgetId: string;
      }[];
      topQuestions: { question: string; count: number; lastAsked: string }[];
    };
  }>
> => getApiHandler("dashboard/user");
