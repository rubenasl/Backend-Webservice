import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './entities/service.entity';
import { Usuario } from 'src/usuario/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Services,Usuario])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
