import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/entity/category.schema';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Category])
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryModule, MongooseModule]
})
export class CategoryModule { }
