import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    try {
      const token = await this.authService.login(req.user);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60,
      });
    } catch (e) {
      return new UnauthorizedException();
    }
  }

  @UseGuards(LocalGuard)
  @Post('logout')
  async logout(@Request() req, @Res({ passthrough: true }) res) {
    res.cookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 0,
    });
    return req.logout();
  }
}
