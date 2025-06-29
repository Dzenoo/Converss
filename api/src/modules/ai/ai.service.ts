import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index";

import { Bot } from "../bot/schema/bot.schema";

@Injectable()
export class AiService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get("OPENAI_API_KEY"),
      timeout: 10000,
      maxRetries: 2,
    });
  }

  async generateBotResponse(data: {
    userMessage: string;
    bot: Bot;
  }): Promise<string> {
    const isSafe = await this.moderateContent(data.userMessage);
    if (!isSafe) {
      return data.bot.fallbackMessage;
    }

    const systemPrompt = this.buildSystemPrompt(data.bot);

    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: data.userMessage },
    ];

    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 256,
    });

    return response.choices[0]?.message?.content || data.bot.fallbackMessage;
  }

  /**
   * Check if the input text is safe using OpenAI's Moderation API.
   * @param text The text to moderate.
   * @returns {boolean} True if safe, false otherwise.
   * @throws Error with moderation details if flagged.
   */
  private async moderateContent(text: string): Promise<boolean> {
    const moderationResponse = await this.openai.moderations.create({
      model: "omni-moderation-latest",
      input: text,
    });

    const moderationResults = moderationResponse.results[0];

    if (moderationResults.flagged) {
      return false;
    }
    return true;
  }

  private buildSystemPrompt(bot: Bot): string {
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
