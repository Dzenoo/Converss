import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  clerkId: string;

  @Prop({
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
    trim: true,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    minlength: 5,
    maxlength: 155,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isOnboarding: boolean;

  @Prop({
    type: [{ type: Types.ObjectId, ref: "Bot" }],
    default: [],
  })
  bots: Types.ObjectId[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
