import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { JwtAuthGuard } from 'src/usuario/jwt-auth.guard';

@Controller('api/resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto);
  }

  @Get()
  findAll() {
    return this.resumeService.findAll();
  }

  @Get('user/:user_id')
  findByUserId(@Param('user_id') user_id: string) {
    return this.resumeService.findByUserId(user_id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() UpdateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(+id, UpdateResumeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.resumeService.delete(+id);
  }
}
