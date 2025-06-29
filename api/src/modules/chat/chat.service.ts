import { FilterQuery, Model, Types } from "mongoose";
import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Chat } from "./schema/chat.schema";

import { BotService } from "../bot/bot.service";
import { AiService } from "@/modules/ai/ai.service";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    private readonly botService: BotService,
    private readonly aiService: AiService
  ) {}

  async find(query: FilterQuery<Chat> = {}): Promise<Chat[]> {
    return await this.chatModel.find(query).lean().exec();
  }

  async getRecentActivity(botIds: Types.ObjectId[], limit = 10) {
    return this.chatModel.aggregate([
      { $match: { botId: { $in: botIds } } },
      { $unwind: "$messages" },
      { $sort: { "messages.timestamp": -1 } },
      { $limit: limit },
      {
        $project: {
          botId: 1,
          content: "$messages.content",
          role: "$messages.role",
          timestamp: "$messages.timestamp",
        },
      },
      {
        $lookup: {
          from: "bots",
          localField: "botId",
          foreignField: "_id",
          as: "bot",
        },
      },
      { $unwind: "$bot" },
      {
        $project: {
          botName: "$bot.businessName",
          botId: "$bot._id",
          widgetId: "$bot.widgetId",
          content: 1,
          role: 1,
          timestamp: 1,
        },
      },
    ]);
  }

  async getTopQuestions(botIds: Types.ObjectId[], limit = 10) {
    return this.chatModel.aggregate([
      { $match: { botId: { $in: botIds } } },
      { $unwind: "$messages" },
      { $match: { "messages.role": "user" } },
      {
        $group: {
          _id: "$messages.content",
          count: { $sum: 1 },
          lastAsked: { $max: "$messages.timestamp" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: limit },
      {
        $project: {
          question: "$_id",
          count: 1,
          lastAsked: 1,
          _id: 0,
        },
      },
    ]);
  }

  async calculateResponseTimes(botId: string) {
    const result = await this.chatModel.aggregate([
      { $match: { botId } },
      { $unwind: "$messages" },
      {
        $group: {
          _id: null,
          avg: { $avg: "$messages.responseTime" },
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      avg: result[0]?.avg || 0,
      count: result[0]?.count || 0,
    };
  }

  async processMessage(data: {
    widgetId: string;
    message: string;
  }): Promise<ResponseObject> {
    const bot = await this.botService.findOne({
      widgetId: data.widgetId,
      isActive: true,
    });
    if (!bot) throw new NotFoundException("Bot not found");

    const aiResponse = await this.aiService.generateBotResponse({
      userMessage: data.message,
      bot: bot,
    });

    let chat = await this.chatModel.findOne({ botId: bot._id });
    if (!chat) {
      chat = await this.chatModel.create({ botId: bot._id, messages: [] });
    }

    chat.messages.push(
      { role: "user", content: data.message, timestamp: new Date() },
      { role: "assistant", content: aiResponse, timestamp: new Date() }
    );

    await chat.save();

    await this.botService.findOneByIdAndUpdate(bot._id, {
      $inc: {
        "analytics.totalConversations": 1,
        "analytics.messagesThisMonth": 1,
        "analytics.responseTimes.count": 1,
      },
      $set: {
        "analytics.lastActive": new Date(),
      },
      $push: {
        "analytics.topQuestions": {
          $each: [{ question: data.message, count: 1 }],
          $sort: { count: -1 },
          $slice: 10,
        },
      },
    });

    return {
      data: {
        response: aiResponse,
      },
      statusCode: HttpStatus.OK,
    };
  }
}
