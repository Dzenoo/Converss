import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Bot, BotDocument } from "./schema/bot.schema";
import { UserService } from "../user/user.service";
import { CreateBotDto } from "./dto/create-bot.dto";
import { GetBotsDto } from "./dto/get-bots.dto";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot.name) private readonly botModel: Model<Bot>,
    private readonly userService: UserService
  ) {}

  async find(query: FilterQuery<Bot> = {}): Promise<Bot[]> {
    return await this.botModel.find(query).lean().exec();
  }

  async findOne(query: FilterQuery<Bot> = {}): Promise<BotDocument | null> {
    return await this.botModel.findOne(query).exec();
  }

  async findOneByIdAndUpdate(
    id: Types.ObjectId,
    update: UpdateQuery<Bot> = {}
  ): Promise<void> {
    await this.botModel.findByIdAndUpdate(id, update).exec();
  }

  async getBotByWidgetId(data: { widgetId: string }): Promise<ResponseObject> {
    const bot = await this.botModel.findOne({
      widgetId: data.widgetId,
    });

    if (!bot) throw new NotFoundException("Bot not found");

    return {
      data: { bot },
      statusCode: HttpStatus.OK,
    };
  }

  async create(data: {
    clerkUserId: string;
    body: CreateBotDto;
  }): Promise<ResponseObject> {
    const user = await this.userService.findOne({ clerkId: data.clerkUserId });

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    const mongoUserId = user._id;

    const widgetId = uuidv4();

    const bot = await this.botModel.create({
      userId: mongoUserId,
      widgetId,
      businessName: data.body.businessName,
      businessDescription: data.body.businessDescription,
      businessWebsite: data.body.businessWebsite,
      industry: data.body.industry,
      faqs: data.body.faqs,
      tone: data.body.tone,
      primaryRole: data.body.primaryRole,
      greetingMessage: data.body.greetingMessage,
      fallbackMessage: data.body.fallbackMessage,
    });

    await this.userService.findAndUpdateOne(
      {
        _id: mongoUserId,
      },
      {
        $push: { bots: bot._id },
        isOnboarding: false,
      }
    );

    return {
      data: {
        botId: bot._id,
      },
      message: "Bot successfully created!",
      statusCode: HttpStatus.CREATED,
    };
  }

  async getAllByUser(data: {
    clerkUserId: string;
    query: GetBotsDto;
  }): Promise<ResponseObject> {
    const { page = 1, limit = 10, search, sort } = data.query;

    const user = await this.userService.findOne({ clerkId: data.clerkUserId });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const conditions: any = {
      userId: user._id,
    };

    if (search) {
      const regexSearch = new RegExp(String(search), "i");
      conditions.$or = [
        { businessName: { $regex: regexSearch } },
        { businessDescription: { $regex: regexSearch } },
      ];
    }

    const sortOptions: any = { createdAt: sort === "desc" ? -1 : 1 };

    const bots = await this.botModel
      .find(conditions)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    const totalBots = await this.botModel.countDocuments(conditions);

    return {
      data: {
        bots,
        totalBots,
      },
      statusCode: HttpStatus.OK,
    };
  }

  async getByUserAndId(data: {
    id: string;
    clerkUserId: string;
  }): Promise<ResponseObject> {
    const bot = await this.getBotByUserAndCheckAccess({
      botId: data.id,
      clerkUserId: data.clerkUserId,
    });

    return {
      data: {
        bot,
      },
      statusCode: HttpStatus.OK,
    };
  }

  async update(data: {
    id: string;
    body: any;
    clerkUserId: string;
  }): Promise<ResponseObject> {
    await this.getBotByUserAndCheckAccess({
      botId: data.id,
      clerkUserId: data.clerkUserId,
    });

    const bot = await this.botModel.findByIdAndUpdate(
      data.id,
      { $set: data.body },
      {
        new: true,
        runValidators: true,
        strict: true,
      }
    );

    if (!bot) {
      throw new NotAcceptableException("Bot could not be updated.");
    }

    return {
      message: "Bot updated successfully.",
      statusCode: HttpStatus.OK,
    };
  }

  async remove(data: {
    id: string;
    clerkUserId: string;
  }): Promise<ResponseObject> {
    const { bot, user } = await this.getBotByUserAndCheckAccess({
      botId: data.id,
      clerkUserId: data.clerkUserId,
    });

    await Promise.all([
      this.botModel.findByIdAndDelete(bot._id),
      this.userService.findAndUpdateMany(
        { _id: user._id },
        { $pull: { bots: bot._id } }
      ),
    ]);

    return {
      message: "Bot successfully deleted.",
      statusCode: HttpStatus.ACCEPTED,
    };
  }

  private async getBotByUserAndCheckAccess(data: {
    botId: string;
    clerkUserId: string;
  }) {
    const user = await this.userService.findOne({ clerkId: data.clerkUserId });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const bot = await this.botModel.findOne({
      _id: data.botId,
      userId: user._id,
    });

    if (!bot) {
      throw new NotAcceptableException("Bot does not exist.");
    }

    if (bot.userId.toString() !== user._id.toString()) {
      throw new UnauthorizedException();
    }

    return { bot, user };
  }
}
