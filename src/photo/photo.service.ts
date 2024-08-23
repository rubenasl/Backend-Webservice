import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { plainToClass } from 'class-transformer';
import { Usuario } from 'src/usuario/entities/user.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private PhotoRep: Repository<Photo>,
    @InjectRepository(Usuario) private UserRep: Repository<Usuario>,
  ) {}

  async findAll() {
    try {
      const photos = await this.PhotoRep.find({ relations: ['user_id'] });

      return photos.map(photo => {
        const photoWithUserId = {
          ...plainToClass(Photo, photo),
          user_id: photo.user_id.id,  // Include only the user_id
        };
        return photoWithUserId;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving photos');
    }
  }

  async findByUserId(username: string) {
    try {
      const user = await this.UserRep.findOne({
        where: { username },
      });
  
      if (!user) {
        throw new NotFoundException(`User not found for username: ${username}`);
      }
  
      const skills = await this.PhotoRep.find({
        where: {
          user_id: user, // Aquí usamos el objeto `user` directamente
        },
        relations: ['user_id'],
        order: {
          id: 'ASC',  // Ordena por ID en orden ascendente
        },
      });
  
      return skills.map(service => {
        const serviceWithFilteredFields = {
          ...plainToClass(Photo, service),
          user_id: service.user_id.id  // Include only the user_id
        };
        return serviceWithFilteredFields;
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving skills by user ID');
    }
  }
  
  async findBySection(section: string) {
    try {
      const photo = await this.PhotoRep.findOne({ where: { section }} );

      if (!photo) {
        throw new NotFoundException('No photos found for the given section');
      }

      return plainToClass(Photo, photo);
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving photos by section');
    }
  }

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    try {
      const newPhoto = this.PhotoRep.create(createPhotoDto);
      return await this.PhotoRep.save(newPhoto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating photo');
    }
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto) {
    try {
      const photo = await this.PhotoRep.findOneBy({ id });
      if (!photo) {
        throw new NotFoundException('Photo not found');
      }

      this.PhotoRep.merge(photo, updatePhotoDto);
      return await this.PhotoRep.save(photo);
    } catch (error) {
      throw new InternalServerErrorException('Error updating photo');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.PhotoRep.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Photo not found');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting photo');
    }
  }
}
