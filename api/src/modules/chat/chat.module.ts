import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Chat, ChatSchema } from "./schema/chat.schema";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";

import { BotModule } from "../bot/bot.module";
import { UserModule } from "../user/user.module";

import { AiService } from "@/modules/ai/ai.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    UserModule,
    forwardRef(() => BotModule),
  ],
  controllers: [ChatController],
  providers: [ChatService, AiService],
  exports: [ChatService],
})
export class ChatModule {}
