import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { JwtAuthGuard } from 'src/usuario/jwt-auth.guard';

@Controller('api/skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Get('user/:user_id')
  findByUserId(@Param('user_id') user_id: string) {
    return this.skillService.findByUserId(user_id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() CreateSkillDto: CreateSkillDto) {
    return this.skillService.update(+id, CreateSkillDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.skillService.delete(+id);
  }
}
