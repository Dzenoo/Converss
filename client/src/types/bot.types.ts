// TYPES

export type DashboardBotDetailsTab =
  | "overview"
  | "conversations"
  | "faq"
  | "customize-ai"
  | "bot-testing"
  | "deployment"
  | "settings";

export type GetBotDashboardResponse = {
  data: {
    bot: IBot;
    stats: {
      totalConversations: number;
      messagesThisMonth: number;
      avgResponseTime: number;
      topQuestions: ITopQuestion[];
    };
    recentChats: {
      id: string;
      messageCount: number;
      lastMessage: string;
      updatedAt: Date;
    }[];
  };
};

// INTERFACES

export interface IFAQ {
  question: string;
  answer: string;
}

export interface ITopQuestion {
  question: string;
  count: number;
}

export interface IResponseTimes {
  count: number;
  totalTime: number;
  avgTime: number;
  lastUpdated: Date;
}

export interface IAnalytics {
  totalConversations: number;
  lastActive?: Date;
  messagesThisMonth: number;
  topQuestions: ITopQuestion[];
  responseTimes: IResponseTimes;
}

export interface IBot {
  _id: string;
  businessName: string;
  businessDescription: string;
  businessWebsite: string;
  industry: string;
  faqs: IFAQ[];
  tone:
    | "friendly"
    | "formal"
    | "funny"
    | "professional"
    | "empathetic"
    | "supportive";
  primaryRole: string;
  greetingMessage: string;
  fallbackMessage: string;
  isActive: boolean;
  userId: string;
  widgetId: string;
  analytics: IAnalytics;
  createdAt: Date;
  updatedAt?: Date;
}

// DTOS

export type CreateBotDto = {
  businessName: string;
  businessDescription: string;
  industry: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  tone: string;
  primaryRole: string;
  greetingMessage: string;
  fallbackMessage: string;
};

export type UpdateBotDto = Partial<CreateBotDto>;

export type GetUserBotsDto = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};
