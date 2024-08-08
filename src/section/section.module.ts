import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Usuario } from 'src/usuario/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Section,Usuario])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
