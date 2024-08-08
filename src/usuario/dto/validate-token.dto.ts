import { IsString } from "class-validator";

export class ValidateTokenDto {
  @IsString()  
  authorization: string;
  }
  