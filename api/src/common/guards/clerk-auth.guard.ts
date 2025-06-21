import {
  CanActivate,
  ExecutionContext,
  Injectable,
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
      console.error("Clerk token verification failed:", err);
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
