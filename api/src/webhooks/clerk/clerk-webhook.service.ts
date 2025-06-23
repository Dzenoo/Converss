import { Injectable, Logger } from "@nestjs/common";

import { UserService } from "@/models/user/user.service";

@Injectable()
export class ClerkWebhookService {
  private readonly logger = new Logger(ClerkWebhookService.name);

  constructor(private readonly userService: UserService) {}

  async handleUserCreated(userData: any) {
    try {
      const existingUser = await this.userService.findOne({
        clerkUserId: userData.id,
      });
      if (existingUser) return existingUser;

      return this.userService.createOne({
        clerkId: userData.id,
        email: this.extractPrimaryEmail(userData),
        username: userData.first_name,
      });
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  private extractPrimaryEmail(userData: any): string {
    return (
      userData.email_addresses?.find(
        (e: any) => e.id === userData.primary_email_address_id
      )?.email_address || ""
    );
  }
}
