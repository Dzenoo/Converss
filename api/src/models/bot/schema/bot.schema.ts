import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class Bot {
  // ----------- ONBOARDING ------------ //
  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  })
  businesName: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
  })
  businessDescription: string;

  @Prop({
    type: String,
    required: true,
  })
  industry: string;

  @Prop([
    {
      question: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
      },
      answer: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
      },
    },
  ])
  faqs: {}[];

  @Prop({
    enum: [
      "friendly",
      "formal",
      "funny",
      "professional",
      "empathetic",
      "supportive",
    ],
    required: true,
  })
  tone: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  })
  primaryRole: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  })
  greetingMessage: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  })
  fallbackMessage: string;
  // ----------- ONBOARDING ------------ //

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  widgetId: string;
}

export type BotDocument = HydratedDocument<Bot>;
export const BotSchema = SchemaFactory.createForClass(Bot);
