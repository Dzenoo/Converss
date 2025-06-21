import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class Conversation {
  @Prop([
    {
      role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ])
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }>;

  @Prop({
    type: Types.ObjectId,
    ref: "Bot",
    required: true,
    index: true,
  })
  botId: Types.ObjectId;

  @Prop({
    required: true,
    index: true,
  })
  sessionId: string;
}

export type ConversationDocument = HydratedDocument<Conversation>;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
