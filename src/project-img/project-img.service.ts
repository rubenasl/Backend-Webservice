import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateProjectImgDto } from './dto/create-project-img.dto';
import { UpdateProjectImgDto } from './dto/update-project-img.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectIMG } from './entities/project-img.entity';
import { plainToClass } from 'class-transformer';
import { Usuario } from 'src/usuario/entities/user.entity';

@Injectable()
export class ProjectImgService {
  constructor(
    @InjectRepository(ProjectIMG) private ProjectIMGRep: Repository<ProjectIMG>,
    @InjectRepository(Usuario) private UserRep: Repository<Usuario>,
  ) {}

  async findAll() {
    try {
      const projectImages = await this.ProjectIMGRep.find({ relations: ['project_id', 'project_id.user_id', 'project_id.skills'] });

      return projectImages.map(projectImage => {
        const projectWithFilteredFields = {
          ...plainToClass(ProjectIMG, projectImage),
            user_id: projectImage.user_id.id,
            project_id: projectImage.project_id.id

        };
        return projectWithFilteredFields;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving project images');
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
  
      const skills = await this.ProjectIMGRep.find({
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
          ...plainToClass(ProjectIMG, service),
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

  async create(createProjectImgDto: CreateProjectImgDto): Promise<ProjectIMG> {
    try {
      const newProjectIMG = this.ProjectIMGRep.create(createProjectImgDto);
      return await this.ProjectIMGRep.save(newProjectIMG);
    } catch (error) {
      throw new InternalServerErrorException('Error creating project image');
    }
  }

  async update(id: number, updateProjectImgDto: UpdateProjectImgDto) {
    try {
      const projectIMG = await this.ProjectIMGRep.findOneBy({ id });
      if (!projectIMG) {
        throw new NotFoundException('Project image not found');
      }

      this.ProjectIMGRep.merge(projectIMG, updateProjectImgDto);
      return await this.ProjectIMGRep.save(projectIMG);
    } catch (error) {
      throw new InternalServerErrorException('Error updating project image');
    }
  }

  async delete(id: number) {
    try {
      const result = await this.ProjectIMGRep.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Project image not found');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting project image');
    }
  }
}
