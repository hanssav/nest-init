import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(data: LoginDTO) {
    try {
      const user = await this.userService.findByEmail(data.email);

      if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new BadRequestException('Email atau Password Invalid');
      }

      const payload = { sub: user.id, email: user.email };
      return {
        message: 'Login Successful',
        access_token: await this.jwtService.signAsync(payload),
        user: { id: user.id, email: user.email, name: user.name },
      };
    } catch (error) {
      console.error('ERROR:', error);
      throw error;
    }
  }

  async createUser(data: RegisterDto) {
    try {
      const userExists = await this.userService.findByEmail(data.email);
      if (userExists) {
        throw new BadRequestException('Email has registered');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = await this.userService.create({
        ...data,
        password: hashedPassword,
      });

      const { password, ...result } = newUser;
      return { message: 'Registration successful~', user: result };
    } catch (error) {
      console.error('ERROR:', error.code, error.message);
      throw error;
    }
  }
}
