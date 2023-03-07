import { Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Controller, UseGuards, Request, Post, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:notificationId/read')
  readUserNotification(
    @Request() req,
    @Param('notificationId') notificationId,
  ) {
    return this.notificationsService.readUserNotification(
      Number(notificationId),
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserNotifications(@Request() req) {
    return this.notificationsService.listAllUserUnreadNotifications(
      req.user.id,
    );
  }
}
