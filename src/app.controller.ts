import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './register.dto';
import { LoginDTO } from './login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() loginData: LoginDTO) {
    return this.appService.login(loginData);
  }

  @Post('user')
  async create(@Body() userData: RegisterDto) {
    return this.appService.createUser(userData);
  }

  @Get('users')
  async findAll() {
    return this.appService.getUsers();
  }
}
