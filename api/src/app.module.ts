import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { UserModule } from "./models/user/user.module";
import { BotModule } from "./models/bot/bot.module";
import { ChatModule } from "./models/chat/chat.module";
import { ClerkWebhookModule } from "./webhooks/clerk/clerk-webhook.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>("MONGODB_URI"),
          dbName: configService.get<string>("MONGODB_NAME"),
        };
      },
    }),
    UserModule,
    BotModule,
    ChatModule,
    ClerkWebhookModule,
  ],
})
export class AppModule {}
