import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { JwtAuthGuard } from 'src/usuario/jwt-auth.guard';

@Controller('api/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Get()
  findAll() {
    return this.photoService.findAll();
  }
  
  @Get('section/:section')
  async findBySection(@Param('section') section: string) {
    return this.photoService.findBySection(section);
  }

  @Get('user/:user_id')
  findByUserId(@Param('user_id') user_id: string) {
    return this.photoService.findByUserId(user_id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() CreatePhotoDto: CreatePhotoDto) {
    return this.photoService.update(+id, CreatePhotoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.photoService.delete(+id);
  }
}
