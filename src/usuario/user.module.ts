import { Module } from '@nestjs/common';
import { UsuarioService } from './user.service';
import { UsuarioController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'super-secret',
      signOptions:{
        expiresIn:3600,
      },
    }),
    TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]
})
export class UsuarioModule {}
