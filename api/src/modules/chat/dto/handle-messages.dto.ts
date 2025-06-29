import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";

import { sanitizeInput } from "@/common/utils";

export class ProcessMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @Transform(({ value }) => sanitizeInput(value))
  message: string;
}
