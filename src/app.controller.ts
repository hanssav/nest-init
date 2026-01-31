import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('user')
  async create(@Body() userData: { name: string; email: string }) {
    return this.appService.createUser(userData);
  }

  @Get('users')
  async findAll() {
    return this.appService.getUsers();
  }
}
