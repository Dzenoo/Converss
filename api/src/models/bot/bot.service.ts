import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
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

  async createBot(clerkUserId: string, body: CreateBotDto) {
    const user = await this.userService.findOne({ clerkId: clerkUserId });

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    const mongoUserId = user._id;

    const widgetId = uuidv4();

    const bot = await this.botModel.create({
      userId: mongoUserId,
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

  async getBotById() {}

  async getUserBots() {}

  async updateBot() {}

  async getBotByWidgetId() {}

  private generateEmbedCode() {}
}
