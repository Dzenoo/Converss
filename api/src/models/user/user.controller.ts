import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ClerkAuthGuard } from "../../common/guards/clerk-auth.guard";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("sync")
  @UseGuards(ClerkAuthGuard)
  async syncUser(@Req() req) {
    const clerkUser = req["clerkUser"];
    const user = await this.userService.syncUserFromClerk(clerkUser);
    return { isOnboarding: user.isOnboarding };
  }
}
