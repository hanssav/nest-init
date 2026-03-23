// src/user/user.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Request() req) {
    const userId = req.user.sub;

    return this.userService.findOne(userId);
  }
}
