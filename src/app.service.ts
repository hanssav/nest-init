import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { name: string; email: string }) {
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
