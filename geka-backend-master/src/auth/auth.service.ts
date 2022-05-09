import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterRequest } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(login);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new HttpException(
      'Неправильный логин или пароль',
      HttpStatus.BAD_REQUEST,
    );
  }

  async login(user: User) {
    const payload = { login: user.login, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registrationData: RegisterRequest) {
    const userData = await this.usersService.createUser(registrationData);

    return {
      access_token: this.jwtService.sign(userData),
    };
  }
}
