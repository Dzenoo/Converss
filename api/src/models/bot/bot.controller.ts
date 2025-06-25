import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";

import { BotService } from "./bot.service";
import { CreateBotDto } from "./dto/create-bot.dto";

import { ClerkAuthGuard } from "@/common/guards/clerk-auth.guard";
import { ClerkUser } from "@/common/decorators/clerk-user.decorator";

import { ClerkUserType } from "@/types";

@Controller("bots")
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post("create")
  @UseGuards(ClerkAuthGuard)
  async createBot(
    @ClerkUser() clerkUser: ClerkUserType,
    @Body() body: CreateBotDto
  ) {
    return await this.botService.create(clerkUser.sub, body);
  }

  @Post("finish-onboarding")
  @UseGuards(ClerkAuthGuard)
  async finishOnboarding(@ClerkUser() clerkUser: ClerkUserType) {
    return await this.botService.finishOnboarding(clerkUser.sub);
  }
}
