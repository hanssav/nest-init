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
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginData: LoginDTO) {
    return this.authService.login(loginData);
  }

  @Post('user')
  async create(@Body() userData: RegisterDto) {
    return this.authService.createUser(userData);
  }

  @Get('users')
  async findAll() {
    return this.authService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;

    const user = await this.userService.findOne(userId);

    return {
      message: 'Profile data fetched successfully',
      user,
    };
  }
}
