import { Body, Controller, Param, Post } from "@nestjs/common";

import { ChatService } from "./chat.service";
import { ProcessMessageDto } from "./dto/handle-messages.dto";

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
}
