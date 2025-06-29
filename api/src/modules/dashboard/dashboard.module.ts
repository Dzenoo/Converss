import { Module } from "@nestjs/common";

import { UserModule } from "../user/user.module";
import { BotModule } from "../bot/bot.module";
import { ChatModule } from "../chat/chat.module";

import { DashboardController } from "./dashboard.controller";

import { DashboardService } from "./dashboard.service";

@Module({
  imports: [UserModule, BotModule, ChatModule],
  controllers: [DashboardController],
  exports: [DashboardService],
  providers: [DashboardService],
})
export class DashboardModule {}
