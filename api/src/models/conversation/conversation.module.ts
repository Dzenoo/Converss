import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Conversation, ConversationSchema } from "./schema/conversation.schema";
import { ConversationController } from "./conversation.controller";
import { ConversationService } from "./conversation.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
