import { Module } from '@nestjs/common';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { FoodEntriesModule } from './models/foodEntries/food-entries.module';
import { NotificationsModule } from './models/notifications/notifications.module';

@Module({
  imports: [AuthModule, UsersModule, FoodEntriesModule, NotificationsModule],
})
export class AppModule {}
