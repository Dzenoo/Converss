import {
  Connection,
  FilterQuery,
  Model,
  UpdateQuery,
  UpdateWriteOpResult,
} from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

import { User, UserDocument } from "./schema/user.schema";
import { ClerkClient, createClerkClient } from "@clerk/backend";

@Injectable()
export class UserService {
  private clerkClient: ClerkClient;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectConnection() private readonly connection: Connection
  ) {
    this.clerkClient = createClerkClient({
      secretKey: this.configService.get<string>("CLERK_SECRET_KEY"),
    });
  }

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

  async syncUserFromClerk(clerkJwtPayload: any) {
    const clerkId = clerkJwtPayload.sub;

    let user = await this.userModel.findOne({ clerkId });

    if (!user) {
      try {
        const clerkUser = await this.clerkClient.users.getUser(clerkId);

        const primaryEmail = clerkUser.emailAddresses.find(
          (email) => email.id === clerkUser.primaryEmailAddressId
        );

        if (!primaryEmail) {
          throw new Error("No primary email found for user");
        }

        user = await this.userModel.create({
          clerkId,
          username: clerkUser.firstName,
          email: primaryEmail.emailAddress,
        });
      } catch (error) {
        throw new Error("Failed to sync user data");
      }
    }

    return user;
  }
}
