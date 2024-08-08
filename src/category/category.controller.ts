import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/usuario/jwt-auth.guard';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() CreateCategoryDTO: CreateCategoryDTO) {
    return this.CategoryService.create(CreateCategoryDTO);
  }

  @Get()
  findAll() {
    return this.CategoryService.findAll();
  }

  @Get('user/:username')
  findByUserId(@Param('username') username: string) {
    return this.CategoryService.findByUserId(username);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() CreateCategoryDTO: CreateCategoryDTO) {
    return this.CategoryService.update(+id, CreateCategoryDTO);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.CategoryService.delete(+id);
  }
}
