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
