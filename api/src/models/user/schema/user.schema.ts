import { HydratedDocument, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { nameRegex } from "@/common/constants";

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
    trim: true,
    unique: true,
    match: nameRegex,
    index: true,
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
    type: Boolean,
    default: false,
  })
  isGoogleAccount?: boolean;

  @Prop()
  refreshToken?: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
