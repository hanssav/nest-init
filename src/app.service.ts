import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RegisterDto } from './register.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: RegisterDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async getUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error('ERORNYA ADALAH:', error);
      throw error;
    }
  }
}
