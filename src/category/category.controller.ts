import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  async findAllCategories() {
    return await this.categoryService.findAllCategories();
  }

  @Post('/add')
  async addCategory(@Body() category: CategoryDTO) {
    return await this.categoryService.addCategory(category);
  }

  // @Get('/get')

  // @Post('/delete')
  // async deleteCategory(@Query('category'))

  @Put('/update')
  async updateCategory(@Body() body: CategoryDTO) {
    return await this.categoryService.updateCategory(body);
  }
}
