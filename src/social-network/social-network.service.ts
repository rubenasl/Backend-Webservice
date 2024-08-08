import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateSocialNetworkDto } from './dto/create-social-network.dto';
import { UpdateSocialNetworkDto } from './dto/update-social-network.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialNetwork } from './entities/social-network.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SocialNetworkService {
  constructor(
    @InjectRepository(SocialNetwork) private SocialNetworkRep: Repository<SocialNetwork>,
  ) {}

  async findAll() {
    try {
      const socials = await this.SocialNetworkRep.find({ relations: ['user_id'] });

      return socials.map(social => {
        const socialWithFilteredFields = {
          ...plainToClass(SocialNetwork, social),
          user_id: social.user_id.id  // Include only the user_id
        };
        return socialWithFilteredFields;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving social networks');
    }
  }

  async findByUsername(username: string) {
    try {
      const socials = await this.SocialNetworkRep.find({
        where: {
          user_id: {
            username: username,
          },
        },
        relations: ['user_id'],
      });

      if (!socials.length) {
        throw new NotFoundException(`No social networks found for username: ${username}`);
      }

      return socials.map(service => {
        const serviceWithFilteredFields = {
          ...plainToClass(SocialNetwork, service),
          user_id: service.user_id.id  // Include only the user_id
        };
        return serviceWithFilteredFields;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving social networks by username');
    }
  }

  async create(CreateSocialNetworkDto: CreateSocialNetworkDto): Promise<SocialNetwork> {
    try {
      const newSocial = this.SocialNetworkRep.create(CreateSocialNetworkDto);
      return await this.SocialNetworkRep.save(newSocial);
    } catch (error) {
      throw new InternalServerErrorException('Error creating social network');
    }
  }

  async update(id: number, body: UpdateSocialNetworkDto) {
    try {
      const social = await this.SocialNetworkRep.findOneBy({ id });
      if (!social) {
        throw new NotFoundException('Social network not found');
      }

      this.SocialNetworkRep.merge(social, body);
      return await this.SocialNetworkRep.save(social);
    } catch (error) {
      throw new InternalServerErrorException('Error updating social network');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.SocialNetworkRep.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Social network not found');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting social network');
    }
  }
}
