import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entity/user.schema';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';
import { Category, CategorySchema } from 'src/entity/category.schema';
import { Role, RoleSchema } from 'src/entity/role.schema';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User])
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      // { name: Category.name, schema: CategorySchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    CategoryModule,
  ],
  controllers: [UserController],
  providers: [UserService, CategoryService],
  exports: [UserModule, MongooseModule],
})
export class UserModule {}
