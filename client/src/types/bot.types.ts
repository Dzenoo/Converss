export interface IBot {
  _id: string;
  businessDescription: string;
  industry: string;
  faqs: Array<{
    question: string;
    answer: string;
    _id: string;
  }>;
  tone: string;
  primaryRole: string;
  greetingMessage: string;
  fallbackMessage: string;
  isActive: boolean;
  userId: string;
  widgetId: string;
  createdAt: string;
  updatedAt: string;
  businessName: string;
  businessWebsite: string;
}

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

export type GetUserBotsDto = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
};
