import { Controller, Get, Param, UseGuards } from "@nestjs/common";

import { DashboardService } from "./dashboard.service";

import { ClerkUser } from "@/common/decorators/clerk-user.decorator";
import { ClerkUserType } from "@/types";
import { ClerkAuthGuard } from "@/common/guards/clerk-auth.guard";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async getUserDashboard(@ClerkUser() clerkUser: ClerkUserType) {
    return await this.dashboardService.getUserDashboard({
      userId: clerkUser.sub,
    });
  }

  @Get("bot/:botId")
  @UseGuards(ClerkAuthGuard)
  async getBotDashboard(
    @ClerkUser() clerkUser: ClerkUserType,
    @Param("botId") botId: string
  ) {
    return await this.dashboardService.getBotDashboard({
      botId: botId,
      userId: clerkUser.sub,
    });
  }
}
