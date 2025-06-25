import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Bot } from "./schema/bot.schema";
import { UserService } from "../user/user.service";
import { CreateBotDto } from "./dto/create-bot.dto";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot.name) private readonly botModel: Model<Bot>,
    private readonly userService: UserService
  ) {}

  async create(clerkUserId: string, body: CreateBotDto) {
    const user = await this.userService.findOne({ clerkId: clerkUserId });

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    const mongoUserId = user._id;

    const widgetId = uuidv4();

    const bot = await this.botModel.create({
      userId: mongoUserId,
      widgetId,
      businessName: body.businessName,
      businessDescription: body.businessDescription,
      industry: body.industry,
      faqs: body.faqs,
      tone: body.tone,
      primaryRole: body.primaryRole,
      greetingMessage: body.greetingMessage,
      fallbackMessage: body.fallbackMessage,
    });

    await this.userService.findAndUpdateOne(
      {
        _id: mongoUserId,
      },
      {
        $push: { bots: bot._id },
        onboardingCompleted: true,
      }
    );

    return {
      message: "Bot successfully created!",
      status: HttpStatus.CREATED,
    };
  }

  async finishOnboarding(clerkUserId: string) {
    const user = await this.userService.findOne({ clerkId: clerkUserId });

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    if (!user.isOnboarding) {
      throw new NotAcceptableException("User already finished onboarding");
    }

    if (!user.onboardingCompleted) {
      throw new NotAcceptableException("Please finish onboarding!");
    }

    await this.userService.findAndUpdateOne(
      {
        _id: user._id,
      },
      {
        isOnboarding: false,
      }
    );

    return {
      message: "Onboarding finished!",
      status: HttpStatus.ACCEPTED,
    };
  }

  async getAllByUser(userId: string) {
    const bots = await this.botModel.find({ userId }).sort({ createdAt: -1 });
    return bots;
  }

  async getById(id: string, userId: string) {
    const bot = await this.botModel.findById(id);

    if (!bot) {
      throw new NotFoundException("Bot not found");
    }

    if (bot.userId.toString() !== userId) {
      throw new ForbiddenException("Access denied");
    }

    return bot;
  }

  async getByWidgetId(widgetId: string) {
    const bot = await this.botModel.findOne({ widgetId, isActive: true });

    if (!bot) {
      throw new NotFoundException("Bot not found or inactive");
    }

    return bot;
  }

  async update(id: string, body: any, userId: string): Promise<Bot> {
    const bot = await this.botModel.findOne({ _id: id, userId });

    if (!bot) {
      throw new NotFoundException("Bot not found");
    }

    Object.assign(bot, body);
    return bot.save();
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.botModel.findByIdAndDelete(id).exec();
  }

  async chat(botId: string, body: any) {
    const bot = await this.botModel.findById(botId);

    if (!bot) {
      throw new NotFoundException("Bot not found");
    }

    // Check domain restrictions if configured
    // This would require additional logic for domain checking

    // Create conversation or get existing one
    // const conversation =
    //   await this.conversationsService.createOrGetConversation(botId);

    // Build context for OpenAI
    // const systemPrompt = this.buildSystemPrompt(bot);
    // const conversationHistory =
    //   await this.conversationsService.getRecentMessages(
    //     conversation._id.toString(),
    //     10
    //   );

    // Get AI response
    // const aiResponse = await this.openaiService.generateResponse(
    //   systemPrompt,
    //   body.message,
    //   conversationHistory
    // );

    // Save messages
    // await this.conversationsService.addMessage(
    //   conversation._id.toString(),
    //   "user",
    //   body.message
    // );

    // await this.conversationsService.addMessage(
    //   conversation._id.toString(),
    //   "assistant",
    //   aiResponse
    // );

    // return {
    //   message: aiResponse,
    //   conversationId: conversation._id.toString(),
    // };

    return bot;
  }

  private buildSystemPrompt(bot: Bot): string {
    let prompt = `
      You are a helpful AI assistant for ${bot.businessName}. 
      This is business description and industry: ${bot.businessDescription} ${bot.industry}.
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
