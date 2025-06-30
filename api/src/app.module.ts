import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { UserModule } from "./modules/user/user.module";
import { BotModule } from "./modules/bot/bot.module";
import { ChatModule } from "./modules/chat/chat.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { ClerkWebhookModule } from "./modules/clerk/clerk-webhook.module";

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
    DashboardModule,
    ClerkWebhookModule,
  ],
})
export class AppModule {}
