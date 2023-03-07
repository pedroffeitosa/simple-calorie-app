import { Module } from '@nestjs/common';
import { FoodEntriesService } from './food-entries.service';
import { FoodEntriesController } from './food-entries.controller';
import { PrismaService } from 'src/services/prisma.service';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  controllers: [FoodEntriesController],
  providers: [
    FoodEntriesService,
    PrismaService,
    UsersService,
    NotificationsService,
  ],
})
export class FoodEntriesModule {}
