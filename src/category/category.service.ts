import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { Resume } from 'src/resume/entities/resume.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private CatRep: Repository<Category>,
    @InjectRepository(Usuario) private UserRep: Repository<Usuario>,
    @InjectRepository(Resume) private ResumeRep: Repository<Resume>,
  ) {}

  async findAll() {
    try {
      const categories = await this.CatRep.find({ relations: ['user_id','resumes'] });


        return categories;

    } catch (error) {
      throw new InternalServerErrorException('Error retrieving categories');
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
  
      const skills = await this.CatRep.find({
        where: {
          user_id: user, // Aquí usamos el objeto `user` directamente
        },
        relations: ['user_id','resumes'],
        order: {
          id: 'ASC',  // Ordena por ID en orden ascendente
        },
      });
  
      return skills.map(service => {
        const serviceWithFilteredFields = {
          ...plainToClass(Category, service),
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

  async create(CreateCategoryDTO: CreateCategoryDTO): Promise<Category> {
    try {
      const existingCat = await this.CatRep.findOne({
        where: { name: CreateCategoryDTO.name }
      });
  
      if (existingCat) {
        throw new ConflictException('A Category with the same name already exists');
      }
  
        const newCat = this.CatRep.create(CreateCategoryDTO
      );
      return await this.CatRep.save(newCat);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating Category');
    }
  }
  


  async update(id: number, createCategoryDTO: CreateCategoryDTO): Promise<Category> {
    const { ...categoryData } = createCategoryDTO;

    try {
      const category = await this.CatRep.findOne({ where: { id }, relations: ['user_id'] });
      if (!category) {
        throw new NotFoundException('Category not found');
      }


      this.CatRep.merge(category, categoryData);
      return await this.CatRep.save(category);
    } catch (error) {
      throw new InternalServerErrorException('Error updating Category');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.CatRep.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Category not found');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting Category');
    }
  }
}
