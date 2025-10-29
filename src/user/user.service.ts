import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async findUserWithUsername(username: string) {
    return await this.userRepository.findOneByOrFail({ username: username });
  }

  public async validatePassword(username, password) {
    const user = await this.findUserWithUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      //   if (isMatch) { //give JWT here
    }
  }

  public async createNewUser(newUserDTO) {
    //add validation before saving, check if username already exists

    const newUser = await this.userRepository.create(newUserDTO);
    return await this.userRepository.save(newUser);
  }
}
