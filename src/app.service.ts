import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RegisterDto } from './register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './login.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async login(data: LoginDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const { password, ...result } = user;
      return {
        message: 'Login Successful',
        user: result,
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
