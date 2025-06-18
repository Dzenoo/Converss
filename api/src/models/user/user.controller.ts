import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";

import { Request } from "express";

import { UserService } from "./user.service";

import { JwtAuthGuard } from "@/authentication/guards/jwt-auth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() request: Request) {
    const user = request.user;
    if (!user) throw new UnauthorizedException("Unauthorized!");
    return { user };
  }
}
