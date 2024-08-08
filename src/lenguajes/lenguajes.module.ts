import { Module } from '@nestjs/common';
import { LenguajesService } from './lenguajes.service';
import { LenguajesController } from './lenguajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lenguaje } from './entities/lenguaje.entity';
import { Usuario } from 'src/usuario/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Lenguaje,Usuario])],
  controllers: [LenguajesController],
  providers: [LenguajesService],
})
export class LenguajesModule {}
