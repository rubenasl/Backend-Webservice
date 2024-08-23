import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { use } from 'passport';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private SkillRep: Repository<Skill>,
    @InjectRepository(Usuario) private UserRep: Repository<Usuario>,
  ) {}

  async findAll() {
    try {
      const skills = await this.SkillRep.find({
        relations: ['user_id'],
        order: {
          id: 'ASC',  // Ordena por la fecha de creación en orden ascendente (si existe el campo created_at)
        },
      });
  
      return skills.map(skill => {
        const skillWithFilteredFields = {
          ...plainToClass(Skill, skill),
          user_id: skill.user_id.id  // Incluye solo el user_id
        };
        return skillWithFilteredFields;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving skills');
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
  
      const skills = await this.SkillRep.find({
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
          ...plainToClass(Skill, service),
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
  
  
  

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const { porcent } = createSkillDto;
    try {
      const existingSkill = await this.SkillRep.findOne({
        where: {
          name: createSkillDto.name,
          user_id: createSkillDto.user_id
        }
      });
  
      if (existingSkill) {
        throw new ConflictException('A skill with the same name already exists');
      }
  
        const newSkill = this.SkillRep.create({
          name: createSkillDto.name,
          icon: createSkillDto.icon,
          group: createSkillDto.group,
          user_id:createSkillDto.user_id,
          porcent: porcent ? porcent : null}
      );
      return await this.SkillRep.save(newSkill);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating skill');
    }
  }
  

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const { user_id, porcent, ...skillData } = updateSkillDto;

    try {
      const skill = await this.SkillRep.findOne({ where: { id }, relations: ['user_id'] });
      if (!skill) {
        throw new NotFoundException('Skill not found');
      }


      if (porcent === '') {
        skill.porcent = null;
      } else if (porcent !== undefined) {
        skill.porcent = porcent;
      }

      this.SkillRep.merge(skill, skillData);
      return await this.SkillRep.save(skill);
    } catch (error) {
      throw new InternalServerErrorException('Error updating skill');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.SkillRep.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Skill not found');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting skill');
    }
  }
}
