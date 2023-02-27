import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { JwtPayload } from 'src/jwt-payload/jwt-payload.interface';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private jwtService: JwtService) {
    super();
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    let req: Request = context.switchToHttp().getRequest();
    let token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new HttpException(
        'Missing authorization header',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      let payload: JwtPayload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      return payload as any;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
