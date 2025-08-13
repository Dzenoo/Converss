export interface IMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  responseTime?: number;
}

export interface IChat {
  _id: string;
  messages: Array<IMessage>;
  botId: string;
  isTesting: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type HandleMessageDto = {
  chatSessionId: string;
  message: string;
  isTesting: boolean;
};
