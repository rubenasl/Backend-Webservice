import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Usuario } from 'src/usuario/entities/user.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section) private SectionRep: Repository<Section>,
    @InjectRepository(Usuario) private UserRep: Repository<Usuario>,
  ) {}

  async findAll() {
    try {
      const sections = await this.SectionRep.find({ relations: ['user_id'] });

      return sections.map(section => {
        const sectionWithFilteredFields = {
          ...plainToClass(Section, section),
          user_id: section.user_id.id  // Include only the user_id
        };
        return sectionWithFilteredFields;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving sections');
    }
  }

  async findByTitleAndUsername(title: string, username: string){
    try {
      const user = await this.UserRep.findOne({
        where: { username },
      });

      if (!user) {
        throw new NotFoundException(`User not found for username: ${username}`);
      }

      const section = await this.SectionRep.find({
        where: {
          title,
          user_id: user,
        },
        relations: ['user_id'],
        order: {
          id: 'ASC',  // Ordena por ID en orden ascendente
        },
      });

      if (!section) {
        throw new NotFoundException(`Section not found with title: ${title} for username: ${username}`);
      }
      return section.map(section => {
      const sectionWithFilteredFields= {
        ...plainToClass(Section, section),
        user_id: section.user_id.id,  // Include only the user_id
      };

      return sectionWithFilteredFields;
    });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving section by title and username');
    }
  }
  

  async findByUserId(username: string) {
    try {
      const user = await this.UserRep.findOne({
        where: { username },
      });
  
      if (!user) {
        throw new NotFoundException('User not found for username: ${username}');
      }
  
      const skills = await this.SectionRep.find({
        where: {
          user_id: user, // Aquí usamos el objeto user directamente
        },
        relations: ['user_id'],
      });
  
      return skills.map(service => {
        const serviceWithFilteredFields = {
          ...plainToClass(Section, service),
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


  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    try {
      const newSection = this.SectionRep.create(createSectionDto);
      return await this.SectionRep.save(newSection);
    } catch (error) {
      throw new InternalServerErrorException('Error creating section');
    }
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    try {
      const section = await this.SectionRep.findOneBy({ id });
      if (!section) {
        throw new NotFoundException('Section not found');
      }

      this.SectionRep.merge(section, updateSectionDto);
      return await this.SectionRep.save(section);
    } catch (error) {
      throw new InternalServerErrorException('Error updating section');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.SectionRep.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Section not found');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting section');
    }
  }
}
