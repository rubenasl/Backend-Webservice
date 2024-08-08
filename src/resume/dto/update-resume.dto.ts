import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { IsOptional, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
    @IsOptional()
    @IsString()
    titleImpt?: string;
  
    @IsOptional()
    @IsString()
    titleSecondary?: string;
  
    @IsOptional()
    @IsString()
    date_init?: string;
  
    @IsOptional()
    @IsString()
    date_end?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    country?: string;
  
    @IsOptional()
    @IsString()
    link?: string;
  
    @IsOptional()
    @IsString()
    city?: string;
  
    @IsOptional()
    @IsString()
    subtitle?: string;
  
    @IsOptional()
    category_id?: Category;
}
