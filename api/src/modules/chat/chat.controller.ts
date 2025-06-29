import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { ChatService } from "./chat.service";
import { ProcessMessageDto } from "./dto/handle-messages.dto";

import { ClerkUser } from "@/common/decorators/clerk-user.decorator";
import { ClerkUserType } from "@/types";
import { ClerkAuthGuard } from "@/common/guards/clerk-auth.guard";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(":widgetId")
  async handleMessage(
    @Param("widgetId") widgetId: string,
    @Body() body: ProcessMessageDto
  ) {
    return await this.chatService.processMessage({
      widgetId,
      message: body.message,
    });
  }

  @Get(":botId/all")
  @UseGuards(ClerkAuthGuard)
  async getChats(
    @ClerkUser() clerkUser: ClerkUserType,
    @Param("botId") botId: string
  ) {
    return await this.chatService.getAllChatsByBot({
      botId: botId,
      userId: clerkUser.sub,
    });
  }

  @Get(":botId")
  @UseGuards(ClerkAuthGuard)
  async getChat(
    @ClerkUser() clerkUser: ClerkUserType,
    @Param("botId") botId: string
  ) {
    return await this.chatService.getChatByBot({
      botId: botId,
      userId: clerkUser.sub,
    });
  }
}
