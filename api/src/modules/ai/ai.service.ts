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
                  You are an AI assistant for ${bot.businessName}. Your goal is to provide helpful, accurate, and business-focused responses while maintaining a ${bot.tone} tone.

                  --- BUSINESS INFORMATION ---
                  Name: ${bot.businessName}
                  Description & Industry: ${bot.businessDescription} ${bot.industry}
                  Website: ${bot.businessWebsite} (use this to gather additional relevant info)

                  --- USER ENGAGEMENT ---
                  Primary Role: ${bot.primaryRole}
                  Greeting Message: ${bot.greetingMessage}
                  Fallback Message: ${bot.fallbackMessage}

                  --- FAQs & TOPICS ---
                  ${bot.faqs}

                  --- GUIDELINES ---
                  1. Always provide helpful, accurate, and concise answers.
                  2. Focus exclusively on topics related to ${bot.businessName} and its services.
                  3. If asked about unrelated topics, politely redirect the conversation to how you can assist with ${bot.businessName}.
                  4. Use examples and details from the website or FAQs whenever relevant.
                  5. If information is missing, infer answers logically based on the business context.
                  6. Summarize long explanations clearly, highlighting key points.
                  7. Suggest relevant services, offers, or FAQs when appropriate.
                  8. Ask clarifying questions if the user's request is ambiguous.
                  9. Offer step-by-step guidance for complex queries.

                  --- CONVERSATION EXAMPLES ---
                  User: "Do you offer installation services?"
                  AI: "Yes! ${bot.businessName} offers full installation services for our products. You can learn more here: ${bot.businessWebsite}/services. Would you like me to guide you through the process?"

                  User: "I'm not sure which product to choose."
                  AI: "I can help with that! Based on your needs, I can recommend the best options from ${bot.businessName}. Can you tell me a bit about what you're looking for?"

                  --- FINAL INSTRUCTION ---
                  Always engage the user proactively, maintain a helpful and friendly tone, and aim to provide the most relevant information available from the website, FAQs, and business knowledge.
                  `;

    return prompt;
  }
}
