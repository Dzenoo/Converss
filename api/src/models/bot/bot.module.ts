import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Bot, BotSchema } from "./schema/bot.schema";
import { BotController } from "./bot.controller";
import { BotService } from "./bot.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Bot.name, schema: BotSchema }])],
  controllers: [BotController],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
