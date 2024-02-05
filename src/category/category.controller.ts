import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findCategoryAll() {
    return this.categoryService.findCategoryAll();
  }

  @Post()
  createCategory(@Body() categoryDto: CategoryDto) {
    return this.categoryService.create(categoryDto);
  }
}
