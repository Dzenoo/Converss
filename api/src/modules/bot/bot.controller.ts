import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import { BotService } from "./bot.service";
import { CreateBotDto } from "./dto/create-bot.dto";
import { GetBotsDto } from "./dto/get-bots.dto";

import { ClerkAuthGuard } from "@/common/guards/clerk-auth.guard";
import { ClerkUser } from "@/common/decorators/clerk-user.decorator";

import { ClerkUserType } from "@/types";

@Controller("bots")
export class BotController {
  constructor(private readonly botService: BotService) {}

  // PROTECTED
  @Post("create")
  @UseGuards(ClerkAuthGuard)
  async createBot(
    @ClerkUser() clerkUser: ClerkUserType,
    @Body() body: CreateBotDto
  ) {
    return await this.botService.create({ clerkUserId: clerkUser.sub, body });
  }

  @Post("finish-onboarding")
  @UseGuards(ClerkAuthGuard)
  async finishOnboarding(@ClerkUser() clerkUser: ClerkUserType) {
    return await this.botService.finishOnboarding({
      clerkUserId: clerkUser.sub,
    });
  }

  @Get("by-user")
  @UseGuards(ClerkAuthGuard)
  async getBotsByUser(
    @ClerkUser() clerkUser: ClerkUserType,
    @Query() query: GetBotsDto
  ) {
    return await this.botService.getAllByUser({
      clerkUserId: clerkUser.sub,
      query,
    });
  }

  @Get("by-user/:botId")
  @UseGuards(ClerkAuthGuard)
  async getBotByUserAndId(
    @ClerkUser() clerkUser: ClerkUserType,
    @Param("botId") botId: string
  ) {
    return await this.botService.getByUserAndId({
      id: botId,
      clerkUserId: clerkUser.sub,
    });
  }

  @Patch("by-user/:botId/update")
  @UseGuards(ClerkAuthGuard)
  async updateBot(
    @ClerkUser() clerkUser: ClerkUserType,
    @Param("botId") botId: string,
    @Body() body: Partial<CreateBotDto>
  ) {
    return await this.botService.update({
      id: botId,
      clerkUserId: clerkUser.sub,
      body,
    });
  }

  @Delete("by-user/:botId/delete")
  @UseGuards(ClerkAuthGuard)
  async deleteBot(
    @ClerkUser() clerkUser: ClerkUserType,
    @Param("botId") botId: string
  ) {
    return await this.botService.remove({
      clerkUserId: clerkUser.sub,
      id: botId,
    });
  }

  // PUBLIC
  @Get(":widgetId")
  async getBotByWidgetId(@Param("widgetId") widgetId: string) {
    return await this.botService.getBotByWidgetId({ widgetId });
  }
}
