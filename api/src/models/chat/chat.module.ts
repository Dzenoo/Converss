import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Chat, ChatSchema } from "./schema/chat.schema";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
