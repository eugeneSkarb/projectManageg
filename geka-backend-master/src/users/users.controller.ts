import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('projects')
  getProjects(@Req() req) {
    return req.user.projects || [];
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-project')
  addProject(@Req() req) {}
}
