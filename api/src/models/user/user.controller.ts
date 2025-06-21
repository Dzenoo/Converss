import { Controller, Post, UseGuards } from "@nestjs/common";
import { User } from "@clerk/backend";

import { ClerkUser } from "@/common/decorators/clerk-user.decorator";
import { ClerkAuthGuard } from "@/common/guards/clerk-auth.guard";

import { UserService } from "./user.service";

import { ClerkUserType } from "@/types";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("sync")
  @UseGuards(ClerkAuthGuard)
  async syncUser(@ClerkUser() clerkUser: ClerkUserType) {
    const user = await this.userService.syncUserFromClerk(clerkUser);
    return {
      isOnboarding: user.isOnboarding,
      onboardingCompleted: user.onboardingCompleted,
    };
  }
}
