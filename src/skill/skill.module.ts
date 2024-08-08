import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Usuario } from 'src/usuario/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Skill,Usuario])],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
