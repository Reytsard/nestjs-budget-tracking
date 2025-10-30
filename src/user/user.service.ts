import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/entity/user.schema';
import { Model } from 'mongoose';
import newUserDTO from './dto/newUser.dto';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/entity/category.schema';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User) private userRepository: Repository<User>,
    @InjectModel(User.name) private userRepository: Model<User>,
    private categoryService:CategoryService
  ) {}

  public async findUserWithUsername(username: string) {
    return await this.userRepository.findOne({ username: username });
  }

  public async validatePassword(username, password) {
    const user = await this.findUserWithUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      //   if (isMatch) { //give JWT here
    }
  }

  public async createNewUser(newUserDTO:newUserDTO) {
    //add validation before saving, check if username already exists
    const user = await this.userRepository.findOne({username: newUserDTO.username}).exec();

    if(user){
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    //generate hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newUserDTO.password, salt);
    newUserDTO.password = hashedPassword;
    
    const newUser = await this.userRepository.create(newUserDTO);
    if(newUserDTO.role && await this.categoryService.roleExists(newUserDTO.role)){
      newUser.role = (await this.categoryService.getCategoryWithName(newUserDTO.role))!._id;
    }else{
      const userRole = await this.categoryService.getCategoryWithName("user");
      if(!userRole){
        throw new HttpException('user role not found', HttpStatus.GONE);
      }
      newUser.role = userRole!._id;
    }
    return await newUser.save();
  }

  public async findAll(){
    return await this.userRepository.find().exec();
  }
}
