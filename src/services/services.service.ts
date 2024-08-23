import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from './entities/service.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Usuario } from 'src/usuario/entities/user.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services) private ServicesRep: Repository<Services>,
    @InjectRepository(Usuario) private UserRep: Repository<Usuario>,
  ) {}

  async findAll() {
    try {
      const services = await this.ServicesRep.find({
        relations: ['user_id'],
        order: {
          id: 'ASC',  // Ordena por la fecha de creación en orden ascendente (si existe el campo created_at)
        },
      });
  
      return services.map(service => {
        const serviceWithFilteredFields = {
          ...plainToClass(Services, service),
          user_id: service.user_id.id  // Incluye solo el user_id
        };
        return serviceWithFilteredFields;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving services');
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
  
      const skills = await this.ServicesRep.find({
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
          ...plainToClass(Services, service),
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
  
  


  
  async create(createServiceDto: CreateServiceDto): Promise<Services> {
    try {
      const newService = this.ServicesRep.create(createServiceDto);
      return await this.ServicesRep.save(newService);
    } catch (error) {
      throw new InternalServerErrorException('Error creating service');
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.ServicesRep.findOneBy({ id });
      if (!service) {
        throw new NotFoundException('Service not found');
      }

      this.ServicesRep.merge(service, updateServiceDto);
      return await this.ServicesRep.save(service);
    } catch (error) {
      throw new InternalServerErrorException('Error updating service');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.ServicesRep.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Service not found');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting service');
    }
  }
}
