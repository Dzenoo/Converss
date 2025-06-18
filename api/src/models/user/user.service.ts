import {
  Connection,
  FilterQuery,
  Model,
  UpdateQuery,
  UpdateWriteOpResult,
} from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "./schema/user.schema";

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
}
