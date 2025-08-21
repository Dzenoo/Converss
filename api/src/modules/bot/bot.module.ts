import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Bot, BotSchema } from "./schema/bot.schema";
import { BotController } from "./bot.controller";
import { BotService } from "./bot.service";
import { UserModule } from "../user/user.module";
import { ChatModule } from "../chat/chat.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bot.name, schema: BotSchema }]),
    UserModule,
    forwardRef(() => ChatModule),
  ],
  controllers: [BotController],
  providers: [BotService],
  exports: [BotService],
})
export class BotModule {}
