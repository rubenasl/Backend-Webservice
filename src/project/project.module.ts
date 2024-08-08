import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Usuario } from 'src/usuario/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Project,Usuario,Skill])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
