import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ToneType } from "@/types";

class FAQ {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  question: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  answer: string;
}

export class CreateBotDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  businessName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  businessDescription: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FAQ)
  faqs: FAQ[];

  @IsEnum(ToneType)
  tone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  primaryRole: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  greetingMessage: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fallbackMessage: string;
}
