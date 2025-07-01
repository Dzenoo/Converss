import { FilterQuery, Model, Types } from "mongoose";
import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Chat } from "./schema/chat.schema";

import { BotService } from "../bot/bot.service";
import { UserService } from "../user/user.service";
import { AiService } from "@/modules/ai/ai.service";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    private readonly botService: BotService,
    private readonly userService: UserService,
    private readonly aiService: AiService
  ) {}

  async find(query: FilterQuery<Chat> = {}): Promise<Chat[]> {
    return await this.chatModel.find(query).lean().exec();
  }

  async getRecentActivity(botIds: Types.ObjectId[], days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.chatModel.aggregate([
      { $match: { botId: { $in: botIds } } },
      { $unwind: "$messages" },
      { $match: { "messages.timestamp": { $gte: startDate } } },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$messages.timestamp",
              },
            },
            role: "$messages.role",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          counts: {
            $push: {
              role: "$_id.role",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          date: "$_id",
          user: {
            $let: {
              vars: {
                userCount: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$counts",
                        cond: { $eq: ["$$this.role", "user"] },
                      },
                    },
                    0,
                  ],
                },
              },
              in: { $ifNull: ["$$userCount.count", 0] },
            },
          },
          assistant: {
            $let: {
              vars: {
                assistantCount: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$counts",
                        cond: { $eq: ["$$this.role", "assistant"] },
                      },
                    },
                    0,
                  ],
                },
              },
              in: { $ifNull: ["$$assistantCount.count", 0] },
            },
          },
        },
      },
      { $sort: { date: 1 } },
    ]);
  }

  async getTopQuestions(botIds: Types.ObjectId[], limit = 5) {
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

  async getAllChatsByBot(data: {
    botId: string;
    userId: string;
  }): Promise<ResponseObject> {
    const user = await this.userService.findOne({ clerkId: data.userId });
    if (!user) throw new NotFoundException("User not found");

    const bot = await this.botService.findOne({
      _id: data.botId,
      userId: user._id,
    });
    if (!bot) throw new UnauthorizedException();

    const chats = await this.chatModel
      .find({
        botId: bot._id,
      })
      .lean()
      .exec();

    return {
      data: { chats },
      statusCode: HttpStatus.OK,
    };
  }

  async getChatByBot(data: {
    botId: string;
    userId: string;
  }): Promise<ResponseObject> {
    const user = await this.userService.findOne({ clerkId: data.userId });
    if (!user) throw new NotFoundException("User not found");

    const bot = await this.botService.findOne({
      _id: data.botId,
      userId: user._id,
    });
    if (!bot) throw new UnauthorizedException();

    const chat = await this.chatModel
      .findOne({
        botId: bot._id,
      })
      .lean()
      .exec();

    return {
      data: { chat },
      statusCode: HttpStatus.OK,
    };
  }
}
