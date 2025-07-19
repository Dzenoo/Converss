export interface IChat {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp?: Date;
    responseTime?: number;
  }>;
  botId: string;
}
