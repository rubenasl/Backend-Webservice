import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { Resume } from './entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuario/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Resume,Usuario,Category])],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
