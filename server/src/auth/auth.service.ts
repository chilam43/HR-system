import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { checkPassword } from 'hash';
import { JwtPayload } from 'src/jwt-payload/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel() private knex: Knex,
    private jwtService: JwtService,
  ) { }

  async login(input: { email: string; password: string }) {
    let user = await this.knex
      .select('id', 'name', 'email', 'password', 'access_level_id')
      .from('users')
      .where('email', input.email)
      .first();

    if (!user) return { status: false, message: 'Wrong email' };

    let isMatched = await checkPassword(input.password, user.password);

    if (!isMatched) return { status: false, message: 'Wrong password' };

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      access_level_id: user.access_level_id,
    };

    let token = this.jwtService.sign(payload);

    return {
      status: true,
      token,
    };
  }
}
