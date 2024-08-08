import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LenguajesService } from './lenguajes.service';
import { CreateLenguajeDto } from './dto/create-lenguaje.dto';
import { UpdateLenguajeDto } from './dto/update-lenguaje.dto';
import { JwtAuthGuard } from 'src/usuario/jwt-auth.guard';

@Controller('api/lenguajes')
export class LenguajesController {
  constructor(private readonly lenguajesService: LenguajesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createLenguajeDto: CreateLenguajeDto) {
    return this.lenguajesService.create(createLenguajeDto);
  }

  @Get()
  findAll() {
    return this.lenguajesService.findAll();
  }

  @Get('user/:user_id')
  findByUserId(@Param('user_id') user_id: string) {
    return this.lenguajesService.findByUserId(user_id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateLenguajeDto: UpdateLenguajeDto) {
    return this.lenguajesService.update(+id, updateLenguajeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.lenguajesService.remove(+id);
  }
}
