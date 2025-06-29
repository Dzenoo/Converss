import { Controller, Get, UseGuards } from "@nestjs/common";

import { UserService } from "./user.service";
import { ClerkUser } from "@/common/decorators/clerk-user.decorator";
import { ClerkAuthGuard } from "@/common/guards/clerk-auth.guard";
import { ClerkUserType } from "@/types";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async getCurrentUser(@ClerkUser() clerkUser: ClerkUserType) {
    return await this.userService.getCurrentUser(clerkUser);
  }
}
