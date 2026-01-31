import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './register.dto';
import { LoginDTO } from './login.dto';
import { AuthGuard } from './auth.guard';

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

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.appService.getFullProfile(req.user.sub);
  }
}
