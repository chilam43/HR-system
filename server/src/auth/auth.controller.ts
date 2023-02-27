import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    if (!body.email) throw new HttpException('Missing email', HttpStatus.BAD_REQUEST)
    if (!body.password) throw new HttpException('Missing password', HttpStatus.BAD_REQUEST)

    return await this.authService.login(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('test')
  async test() {
    return 'todo';
  }
}

function IsNotEmpty() {
  throw new Error('Function not implemented.');
}
