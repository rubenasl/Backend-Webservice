import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioModule } from './usuario/user.module';

import { ProjectModule } from './project/project.module';
import { ProjectImgModule } from './project-img/project-img.module';
import { SectionModule } from './section/section.module';
import { SocialNetworkModule } from './social-network/social-network.module';
import { ServicesModule } from './services/services.module';
import { PhotoModule } from './photo/photo.module';
import { ResumeModule } from './resume/resume.module';
import { SkillModule } from './skill/skill.module';
import { DataSourceConfig } from './database/data.source';
import { LenguajesModule } from './lenguajes/lenguajes.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UsuarioModule,PhotoModule,
     ProjectModule, ProjectImgModule, SectionModule, SocialNetworkModule, ServicesModule, ResumeModule, SkillModule, LenguajesModule,CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
