import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class Chat {
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
      responseTime: {
        type: Number,
        required: false,
      },
    },
  ])
  messages: Array<{
    role: "user" | "assistant";
    content: string;
    timestamp?: Date;
    responseTime?: number;
  }>;

  @Prop({
    type: Types.ObjectId,
    ref: "Bot",
    required: true,
    index: true,
  })
  botId: Types.ObjectId;

  @Prop({ required: true })
  sessionId: string;

  @Prop({
    required: true,
  })
  isTesting: boolean;
}

export type ChatDocument = HydratedDocument<Chat>;
export const ChatSchema = SchemaFactory.createForClass(Chat);
