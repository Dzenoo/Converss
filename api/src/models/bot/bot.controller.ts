import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";

import { BotService } from "./bot.service";
import { CreateBotDto } from "./dto/create-bot.dto";

import { ClerkAuthGuard } from "@/common/guards/clerk-auth.guard";

@Controller("bots")
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post("create")
  @UseGuards(ClerkAuthGuard)
  async createBot(@Req() req, @Body() body: CreateBotDto) {
    const clerkUser = req["clerkUser"];
    return await this.botService.createBot(clerkUser.sub, body);
  }

  @Post("finish-onboarding")
  @UseGuards(ClerkAuthGuard)
  async finishOnboarding(@Req() req) {
    const clerkUser = req["clerkUser"];
    return await this.botService.finishOnboarding(clerkUser.sub);
  }
}
