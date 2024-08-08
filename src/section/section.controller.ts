import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { SectionModule } from './section.module';
import { JwtAuthGuard } from 'src/usuario/jwt-auth.guard';
import { Section } from './entities/section.entity';

@Controller('api/section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Get('find/:title/:username')
  async findByTitleAndUsername(
    @Param('title') title: string,
    @Param('username') username: string
  ) {
    try {
      return await this.sectionService.findByTitleAndUsername(title, username);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() CreateSectionDto: CreateSectionDto) {
    return this.sectionService.update(+id, CreateSectionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.sectionService.delete(+id);
  }

}
