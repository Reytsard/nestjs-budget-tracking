import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async login(user: { username: string, uuid: string }) {
    //get jwt here
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.uuid };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWTCONSTANT!
      })
    }
  }

  async validateUser(username, password) {
    const user = await this.userService.findUserWithUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return { username: user.username, uuid: user.uuid };
    }

    return null;
  }
}
