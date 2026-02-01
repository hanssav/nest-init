import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Ini membuat PrismaService bisa dipakai di modul mana pun tanpa perlu import ulang
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
