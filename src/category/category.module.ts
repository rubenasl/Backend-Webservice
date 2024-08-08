import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/user.entity';
import { Category } from './entities/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Resume } from 'src/resume/entities/resume.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Category,Usuario,Resume])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
