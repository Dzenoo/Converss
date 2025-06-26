import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { UserService } from "../user/user.service";
import { Chat } from "./schema/chat.schema";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    private readonly userService: UserService
  ) {}

  private buildSystemPrompt(bot: any): string {
    let prompt = `
          You are a helpful AI assistant for ${bot.businessName}. 
          This is business description and industry: ${bot.businessDescription} ${bot.industry}.
          Here is their website: ${bot.businessWebsite}, so please get data from here too.
          Here are some frequently asked questions and topics you should be knowledgeable about: ${bot.faqs}.
          Your primary role is: ${bot.primaryRole}. Respond in this ${bot.tone} tone.
          Your greeting message is: ${bot.greetingMessage}.
          Your fallback message is: ${bot.fallbackMessage}.
          Always be helpful, accurate, and stay focused on topics related to ${bot.businessName}.
          If asked about something unrelated to the business, politely redirect the conversation back to how you can help with ${bot.businessName} services.
        `;
    return prompt;
  }
}
