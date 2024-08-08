import { Module } from '@nestjs/common';
import { SocialNetworkService } from './social-network.service';
import { SocialNetworkController } from './social-network.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialNetwork } from './entities/social-network.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SocialNetwork])],
  controllers: [SocialNetworkController],
  providers: [SocialNetworkService],
})
export class SocialNetworkModule {}
