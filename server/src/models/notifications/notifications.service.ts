import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  listAllUserUnreadNotifications(userId: number) {
    return this.prisma.notification.findMany({
      where: {
        userId,
        read: false,
      },
    });
  }

  async readUserNotification(notificationId: number, userId: number) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });
    if (notification.userId !== userId) {
      throw new HttpException(
        'The user doesnt have access to this data.',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        read: true,
      },
    });
  }

  createNotification(userId: number, message: string) {
    return this.prisma.notification.create({
      data: {
        userId,
        message,
      },
    });
  }
}
