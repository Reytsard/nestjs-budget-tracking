import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entity/user.schema';

@Module({
  imports: [
// TypeOrmModule.forFeature([User])
  MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserModule, MongooseModule]
})  
export class UserModule {}
