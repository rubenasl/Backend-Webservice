import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateLenguajeDto } from './dto/create-lenguaje.dto';
import { UpdateLenguajeDto } from './dto/update-lenguaje.dto';
import { Lenguaje } from './entities/lenguaje.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Usuario } from 'src/usuario/entities/user.entity';

@Injectable()
export class LenguajesService {
  constructor(
    @InjectRepository(Lenguaje) private LenguajeRepo: Repository<Lenguaje>,
    @InjectRepository(Usuario) private UserRep: Repository<Usuario>,
  ) {}

  async create(createLenguajeDto: CreateLenguajeDto) {
    try {
      const newLenguaje = this.LenguajeRepo.create(createLenguajeDto);
      return await this.LenguajeRepo.save(newLenguaje);
    } catch (error) {
      throw new InternalServerErrorException('Error creating lenguaje');
    }
  }

  async findAll() {
    try {
      const lenguajes = await this.LenguajeRepo.find({ relations: ['user_id'] });

      return lenguajes.map(lenguaje => {
        const lenguajeWithUserId = {
          ...plainToClass(Lenguaje, lenguaje),
          user_id: lenguaje.user_id.id,  // Include only the user_id
        };
        return lenguajeWithUserId;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving lenguajes');
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
  
      const skills = await this.LenguajeRepo.find({
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
          ...plainToClass(Lenguaje, service),
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

  async update(id: number, updateLenguajeDto: UpdateLenguajeDto) {
    try {
      const lenguaje = await this.LenguajeRepo.findOneBy({ id });
      if (!lenguaje) {
        throw new NotFoundException('Lenguaje not found');
      }

      this.LenguajeRepo.merge(lenguaje, updateLenguajeDto);
      return await this.LenguajeRepo.save(lenguaje);
    } catch (error) {
      throw new InternalServerErrorException('Error updating lenguaje');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.LenguajeRepo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Lenguaje not found');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting lenguaje');
    }
  }
}
