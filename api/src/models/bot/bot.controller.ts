import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { BotService } from "./bot.service";
import { CreateBotDto } from "./dto/create-bot.dto";

import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { ClerkAuthGuard } from "@/common/guards/clerk-auth.guard";

@Controller("bots")
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post("create")
  @UseGuards(ClerkAuthGuard)
  async createBot(@CurrentUser() user: any, @Body() body: CreateBotDto) {
    return await this.botService.createBot(user._id, body);
  }
}
