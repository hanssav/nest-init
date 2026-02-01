import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

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
