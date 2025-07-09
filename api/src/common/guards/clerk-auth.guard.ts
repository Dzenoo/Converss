import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { verifyToken } from "@clerk/backend";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["authorization"];
    if (!authHeader) throw new UnauthorizedException("No authorization header");

    const token = authHeader.replace("Bearer ", "").trim();

    try {
      const payload = await verifyToken(token, {
        secretKey: this.configService.get<string>("CLERK_SECRET_KEY"),
      });

      request["clerkUser"] = payload;

      return true;
    } catch (err) {
      throw new NotAcceptableException(
        `Clerk token verification failed: ${err}`
      );
    }
  }
}
