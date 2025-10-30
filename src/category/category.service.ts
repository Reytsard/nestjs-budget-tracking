import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryDTO } from './dto/category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/entity/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    // @InjectRepository(Category)
    // private categoryRepository: Repository<Category>,
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) {}

  async addCategory(category: CategoryDTO) {
    // const exists = await this.categoryModel.findOne({
    //   name: category.name,
    // });
    // if (!exists) {
    //   const newCategory = new this.categoryModel(category);
    //   return newCategory.save();
    // }
    // return new HttpException('category already exists', HttpStatus.CONFLICT);
  }

  async updateCategory(body: CategoryDTO) {
  //  return await this.categoryModel.findOneAndUpdate({
  //     name: body.name,
  //   },body);
  }

  async findAllCategories() {
    // return await this.categoryModel.find();
  }
}
