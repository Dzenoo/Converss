import {
  Connection,
  FilterQuery,
  Model,
  UpdateQuery,
  UpdateWriteOpResult,
} from "mongoose";
import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "./schema/user.schema";

import { ClerkUserType } from "@/types";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectConnection() private readonly connection: Connection
  ) {}

  async find(query: FilterQuery<User> = {}): Promise<User[]> {
    return await this.userModel.find(query).exec();
  }

  async findAndUpdateOne(
    query: FilterQuery<User> = {},
    update: UpdateQuery<User> = {}
  ): Promise<UpdateWriteOpResult> {
    return await this.userModel.updateOne(query, update).exec();
  }

  async findAndUpdateMany(
    query: FilterQuery<User> = {},
    update: UpdateQuery<User> = {}
  ): Promise<UpdateWriteOpResult> {
    return await this.userModel.updateMany(query, update).exec();
  }

  async findOne(query: FilterQuery<User> = {}): Promise<UserDocument | null> {
    return await this.userModel.findOne(query).exec();
  }

  async createOne(body: Partial<User>): Promise<UserDocument | null> {
    return await this.userModel.create(body);
  }

  async getCurrentUser(clerkUser: ClerkUserType) {
    const user = await this.userModel.findOne({
      clerkId: clerkUser.sub,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return {
      data: {
        isOnboarding: user.isOnboarding,
        onboardingCompleted: user.onboardingCompleted,
      },
      message: "Successfully found!",
      statusCode: HttpStatus.OK,
    };
  }
}
