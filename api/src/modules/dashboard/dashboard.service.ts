import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";

import { formatResponseTime } from "@/common/utils";

import { UserService } from "../user/user.service";
import { BotService } from "../bot/bot.service";
import { ChatService } from "../chat/chat.service";

@Injectable()
export class DashboardService {
  constructor(
    private readonly userService: UserService,
    private readonly botService: BotService,
    private readonly chatService: ChatService
  ) {}

  async getUserDashboard(data: { userId: string }): Promise<ResponseObject> {
    const user = await this.userService.findOne({ clerkId: data.userId });
    if (!user) throw new Error("User not found");

    const bots = await this.botService.find({ userId: user._id });
    if (bots.length === 0)
      return {
        data: {
          summary: {
            totalBots: 0,
            activeBots: 0,
            totalConversations: 0,
            messagesThisMonth: 0,
          },
          recentActivity: [],
          botPerformance: [],
          topQuestions: [],
        },
        statusCode: HttpStatus.NOT_FOUND,
      };

    const botIds = bots.map((bot: any) => bot._id);

    const [recentChats, topQuestions] = await Promise.all([
      this.chatService.getRecentActivity(botIds),
      this.chatService.getTopQuestions(botIds),
    ]);

    return {
      data: {
        summary: {
          totalBots: bots.length,
          activeBots: bots.filter((bot) => bot.isActive).length,
          totalConversations: bots.reduce(
            (sum, bot) => sum + (bot.analytics?.totalConversations || 0),
            0
          ),
          messagesThisMonth: bots.reduce(
            (sum, bot) => sum + (bot.analytics?.messagesThisMonth || 0),
            0
          ),
        },
        recentActivity: recentChats,
        botPerformance: bots.map((bot: any) => ({
          id: bot._id,
          name: bot.businessName,
          isActive: bot.isActive,
          conversations: bot.analytics?.totalConversations || 0,
          lastActive: bot.analytics?.lastActive || null,
          widgetId: bot.widgetId,
        })),
        topQuestions: topQuestions.slice(0, 5),
      },
      statusCode: HttpStatus.OK,
    };
  }

  async getBotDashboard(data: {
    userId: string;
    botId: string;
  }): Promise<ResponseObject> {
    const user = await this.userService.findOne({ clerkId: data.userId });
    if (!user) throw new NotFoundException("User not found");

    const [bot, chats] = await Promise.all([
      this.botService.findOne({
        _id: data.botId,
        userId: user._id,
      }),
      this.chatService.find({ botId: data.botId }),
    ]);

    if (!bot) throw new Error("Bot not found");

    return {
      data: {
        bot: bot,
        stats: {
          totalConversations: bot.analytics.totalConversations,
          messagesThisMonth: bot.analytics.messagesThisMonth,
          avgResponseTime: formatResponseTime(
            bot.analytics.responseTimes.avgTime
          ),
          topQuestions: bot.analytics.topQuestions,
        },
        recentChats: chats.map((chat: any) => ({
          id: chat._id,
          messageCount: chat.messages.length,
          lastMessage: chat.messages[chat.messages.length - 1]?.content || "",
          updatedAt: chat.updatedAt,
        })),
      },
      statusCode: HttpStatus.OK,
    };
  }
}
