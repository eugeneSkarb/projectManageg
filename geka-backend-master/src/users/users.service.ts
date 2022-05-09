import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterRequest } from '../auth/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bcryptConstants } from '../auth/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(login: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { login } });
  }

  async createUser(userData: RegisterRequest) {
    const user = await this.usersRepository.findOne({
      where: { login: userData.login },
    });

    if (user) {
      throw new HttpException(
        'Юзер с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userData.password.length < 4) {
      throw new HttpException(
        'Пароль не может быть короче 4 символов',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      bcryptConstants.saltRounds,
    );
    const userEntry = await this.usersRepository.save({
      ...userData,
      password: hashedPassword,
    });

    return { id: userEntry.id, login: userEntry.login };
  }

  async getUserById(userId: number) {
    return await this.usersRepository.findOne({ id: userId });
  }

  async addProjectToUser() {}
}
