import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findOneByUsername(username: string) {
    return this.prisma.user.findFirst({ where: { username } });
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    delete user?.password;
    return user;
  }

  listAllUsers() {
    return this.prisma.user.findMany({
      where: {
        role: 'user',
      },
    });
  }
}
