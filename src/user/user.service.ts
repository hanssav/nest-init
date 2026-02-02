import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
  }

  async updateUser(userId: number, data: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password as string, 10);
      data.password = hashedPassword;
    }

    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v != undefined),
    );

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
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
