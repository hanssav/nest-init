import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getFullProfile(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
  }

  async login(data: LoginDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user || !(await bcrypt.compare(data.password, user.password))) {
        throw new Error('Email or Password is incorrect');
      }

      // Payload used to generate JWT token
      const payload = { sub: user.id, email: user.email };

      const { password, ...userWithoutPassword } = user;
      return {
        message: 'Login Successful',
        access_token: await this.jwtService.signAsync(payload),
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error('ERROR:', error);
      throw error;
    }
  }

  async createUser(data: RegisterDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(data.password, salt);

      console.log(salt, 'salt, and hashed password:', hashedPassword);

      return await this.prisma.user.create({
        data: { ...data, password: hashedPassword },
      });
    } catch (error) {
      console.error('ERROR:', error.code, error.message);
      throw error;
    }
  }

  async getUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error('ERROR:', error);
      throw error;
    }
  }
}
