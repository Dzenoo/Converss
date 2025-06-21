import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { HttpStatus, Injectable } from "@nestjs/common";
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

  async createBot(userId: string, body: CreateBotDto) {
    const widgetId = uuidv4();

    const bot = await this.botModel.create({
      userId,
      widgetId,
      businesName: body.businessName,
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
        _id: userId,
      },
      {
        $push: { bots: bot._id },
        isOnboarding: false,
      }
    );

    return {
      message: "Bot successfully created!",
      status: HttpStatus.CREATED,
    };
  }

  async getBotById() {}

  async getUserBots() {}

  async updateBot() {}

  async getBotByWidgetId() {}

  private generateEmbedCode() {}
}
