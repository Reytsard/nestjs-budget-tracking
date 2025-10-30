import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entity/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CategoryModule } from 'src/category/category.module';
import { UserModule } from 'src/user/user.module';
import { Category, CategorySchema } from 'src/entity/category.schema';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema},{name:Category.name, schema:CategorySchema}]),
  JwtModule.register({
    secret:process.env.JWTCONSTANT!,
    signOptions: {expiresIn: '60s'}
  }),
  CategoryModule,
  UserModule
],
  controllers: [AuthController],
  providers: [AuthService, UserService, CategoryService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
