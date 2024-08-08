import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  username: string;
  
 @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  birthday?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  degree?: string;

  @IsOptional()
  @IsBoolean()
  freelancer?: boolean;

  @IsOptional()
  @IsBoolean()
  remote?: boolean;

  @IsOptional()
  @IsString()
  profession?: string;

  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  cvPathEs?: string;

  @IsOptional()
  cvPathEn?: string;
}
