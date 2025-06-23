import {
  Controller,
  Post,
  Req,
  Headers,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { Request } from "express";
import { Webhook } from "svix";

import { ClerkWebhookService } from "./clerk-webhook.service";

@Controller("clerk-webhook")
export class ClerkWebhookController {
  constructor(private readonly clerkWebhookService: ClerkWebhookService) {}

  @Post()
  async handleWebhook(
    @Headers() headers: Record<string, string>,
    @Req() req: Request
  ) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string;

    const requiredHeaders = ["svix-id", "svix-timestamp", "svix-signature"];
    if (!requiredHeaders.every((h) => headers[h])) {
      throw new HttpException(
        "Missing required headers",
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const wh = new Webhook(WEBHOOK_SECRET);
      const payload = wh.verify(req.body, {
        "svix-id": headers["svix-id"],
        "svix-timestamp": headers["svix-timestamp"],
        "svix-signature": headers["svix-signature"],
      }) as any;

      switch (payload.type) {
        case "user.created":
          await this.clerkWebhookService.handleUserCreated(payload.data);
          break;
        // Add other cases as needed
        default:
          console.log(`Unhandled event type: ${payload.type}`);
      }

      return { success: true };
    } catch (err) {
      throw new HttpException("Invalid signature", HttpStatus.UNAUTHORIZED);
    }
  }
}
