import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDTO } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async addCategory(category: CategoryDTO) {
    const exists = await this.categoryRepository.findOneBy({
      name: category.name,
    });
    if (!exists) {
      const newCategory = await this.categoryRepository.create(category);
      return this.categoryRepository.save(newCategory);
    }
    return new HttpException('category already exists', HttpStatus.CONFLICT);
  }

  async updateCategory(body: CategoryDTO) {
    const category = await this.categoryRepository.findOneBy({
      name: body.name,
    });
    if (category) {
      return await this.categoryRepository.update({ id: category.id }, body);
    }
    return new HttpException('category does not exists', HttpStatus.NOT_FOUND);
  }

  async findAllCategories() {
    return await this.categoryRepository.find();
  }
}
