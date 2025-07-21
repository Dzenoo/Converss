export interface IMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  responseTime: number;
}

export interface IChat {
  _id: string;
  messages: Array<IMessage>;
  botId: string;
  createdAt: Date;
  updatedAt: Date;
}
