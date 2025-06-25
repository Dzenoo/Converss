import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Chat, ChatSchema } from "./schema/chat.schema";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";

import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
