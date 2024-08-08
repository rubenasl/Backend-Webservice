import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    category?: string;
  
    @IsOptional()
    @IsString()
    client?: string;
  
    @IsOptional()
    @IsString()
    dateProject?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    url?: string;
  
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    skill_ids?: number[]
}
