import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index";

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

  async generateResponse(
    messages: ChatCompletionMessageParam[]
  ): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        max_completion_tokens: 256,
        temperature: 0.7,
      });

      const responseData = response.choices[0].message.content?.trim();

      if (!responseData) {
        return "";
      }

      return responseData;
    } catch (error) {
      console.log(`OpenAI API failed: ${error.message}`, error.stack);
      throw new Error("Failed to generate AI response");
    }
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
}
