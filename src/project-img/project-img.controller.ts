import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectImgService } from './project-img.service';
import { CreateProjectImgDto } from './dto/create-project-img.dto';
import { UpdateProjectImgDto } from './dto/update-project-img.dto';
import { JwtAuthGuard } from 'src/usuario/jwt-auth.guard';

@Controller('api/project-img')
export class ProjectImgController {
  constructor(private readonly projectImgService: ProjectImgService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProjectImgDto: CreateProjectImgDto) {
    return this.projectImgService.create(createProjectImgDto);
  }

  @Get()
  findAll() {
    return this.projectImgService.findAll();
  }

  @Get('user/:username')
  findByUserId(@Param('username') username: string) {
    return this.projectImgService.findByUserId(username);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() CreateProjectImgDto: CreateProjectImgDto) {
    return this.projectImgService.update(+id, CreateProjectImgDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.projectImgService.delete(+id);
  }
}
