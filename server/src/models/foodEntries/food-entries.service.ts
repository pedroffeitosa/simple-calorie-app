import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  getDateDay,
  getDateMonth,
  getOneWeekBefore,
} from 'src/common/utils/date';
import { PrismaService } from 'src/services/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { CreateUserFoodEntryDto } from './dto/create-user-food-entry.dto';
import { GetUserFoodEntries } from './dto/get-user-food-entries.query';
import { UpdateFoodEntryDto } from './dto/update-food-entry.dto';

@Injectable()
export class FoodEntriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async findOneById(id: number, userId?: number) {
    const foodEntry = await this.prisma.foodEntry.findUnique({ where: { id } });
    if (userId && foodEntry.userId !== userId) {
      throw new HttpException(
        'User does not have access to this food entry',
        HttpStatus.FORBIDDEN,
      );
    }
    return foodEntry;
  }

  getUserDayCalories(day: string, userId: number) {
    return this.prisma.foodEntry.aggregate({
      _sum: {
        calories: true,
      },
      where: {
        day,
        userId,
      },
    });
  }

  getUserMonthlyExpense(month: string, userId: number) {
    return this.prisma.foodEntry.aggregate({
      _sum: {
        price: true,
      },
      where: {
        month,
        userId,
      },
    });
  }

  async createFoodEntry(foodEntry: CreateUserFoodEntryDto, userId: number) {
    const day = getDateDay(new Date(foodEntry.dateTime));
    const month = getDateMonth(new Date(foodEntry.dateTime));
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new HttpException(
        'Invalid userId: User does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.role === 'admin') {
      throw new HttpException(
        'Invalid userId: User is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getUserDayCaloriesResponse = await this.getUserDayCalories(
      day,
      userId,
    );
    const userDayCalories = getUserDayCaloriesResponse._sum.calories || 0;

    if (
      userDayCalories < user.dailyThresholdLimitOfCalories &&
      userDayCalories + foodEntry.calories >= user.dailyThresholdLimitOfCalories
    ) {
      await this.notificationsService.createNotification(
        userId,
        `You've reached your daily limit of calories for ${day}`,
      );
    }

    const getUserMonthlyExpenseResponse = await this.getUserMonthlyExpense(
      month,
      userId,
    );
    const userMonthlyExpenses = getUserMonthlyExpenseResponse._sum.price || 0;
    if (
      userMonthlyExpenses < user.monthlyThresholdLimitOfMoney &&
      userMonthlyExpenses + foodEntry.price >= user.monthlyThresholdLimitOfMoney
    ) {
      await this.notificationsService.createNotification(
        userId,
        "You've reached your montly limit of expenses.",
      );
    }
    return this.prisma.foodEntry.create({
      data: { ...foodEntry, userId, day, month },
    });
  }

  listUserFoodEntries(userId: number, query: GetUserFoodEntries) {
    return query.startDate && query.endDate
      ? this.prisma.foodEntry.findMany({
          where: {
            userId,
            dateTime: {
              gte: new Date(new Date(query.startDate).setUTCHours(0, 0, 0, 0)),
              lte: new Date(
                new Date(query.endDate).setUTCHours(23, 59, 59, 999),
              ),
            },
          },
          orderBy: { dateTime: 'desc' },
        })
      : query.startDate
      ? this.prisma.foodEntry.findMany({
          where: {
            userId,
            dateTime: {
              gte: new Date(new Date(query.startDate).setUTCHours(0, 0, 0, 0)),
            },
          },
          orderBy: { dateTime: 'desc' },
        })
      : query.endDate
      ? this.prisma.foodEntry.findMany({
          where: {
            userId,
            dateTime: {
              lte: new Date(
                new Date(query.endDate).setUTCHours(23, 59, 59, 999),
              ),
            },
          },
          orderBy: { dateTime: 'desc' },
        })
      : this.prisma.foodEntry.findMany({
          where: {
            userId,
          },
          orderBy: { dateTime: 'desc' },
        });
  }

  listUserCaloriesPerDay(userId: number) {
    return this.prisma.foodEntry.groupBy({
      by: ['day'],
      where: {
        userId,
      },
      _sum: {
        calories: true,
      },
      orderBy: {
        day: 'desc',
      },
    });
  }

  listAllFoodEntries(query: GetUserFoodEntries) {
    return query.startDate && query.endDate
      ? this.prisma.foodEntry.findMany({
          where: {
            dateTime: {
              gte: new Date(new Date(query.startDate).setUTCHours(0, 0, 0, 0)),
              lte: new Date(
                new Date(query.endDate).setUTCHours(23, 59, 59, 999),
              ),
            },
          },
          include: {
            user: true,
          },
          orderBy: { dateTime: 'desc' },
        })
      : query.startDate
      ? this.prisma.foodEntry.findMany({
          where: {
            dateTime: {
              gte: new Date(new Date(query.startDate).setUTCHours(0, 0, 0, 0)),
            },
          },
          include: {
            user: true,
          },
          orderBy: { dateTime: 'desc' },
        })
      : query.endDate
      ? this.prisma.foodEntry.findMany({
          where: {
            dateTime: {
              lte: new Date(
                new Date(query.endDate).setUTCHours(23, 59, 59, 999),
              ),
            },
          },
          include: {
            user: true,
          },
          orderBy: { dateTime: 'desc' },
        })
      : this.prisma.foodEntry.findMany({
          include: {
            user: true,
          },
          orderBy: { dateTime: 'desc' },
        });
  }

  countAllFoodEntries(query: GetUserFoodEntries) {
    return query.startDate && query.endDate
      ? this.prisma.foodEntry.aggregate({
          _count: {
            _all: true,
          },
          where: {
            dateTime: {
              gte: new Date(new Date(query.startDate).setUTCHours(0, 0, 0, 0)),
              lte: new Date(
                new Date(query.endDate).setUTCHours(23, 59, 59, 999),
              ),
            },
          },
        })
      : query.startDate
      ? this.prisma.foodEntry.aggregate({
          _count: {
            _all: true,
          },
          where: {
            dateTime: {
              gte: new Date(new Date(query.startDate).setUTCHours(0, 0, 0, 0)),
            },
          },
        })
      : query.endDate
      ? this.prisma.foodEntry.aggregate({
          _count: {
            _all: true,
          },
          where: {
            dateTime: {
              lte: new Date(
                new Date(query.endDate).setUTCHours(23, 59, 59, 999),
              ),
            },
          },
        })
      : this.prisma.foodEntry.aggregate({
          _count: {
            _all: true,
          },
        });
  }

  findFoodEntryById(id: number) {
    return this.prisma.foodEntry.findUnique({ where: { id } });
  }

  async updateFoodEntry(id: number, foodEntryUpdated: UpdateFoodEntryDto) {
    const day = getDateDay(new Date(foodEntryUpdated.dateTime));
    const month = getDateMonth(new Date(foodEntryUpdated.dateTime));
    const foodEntry = await this.findFoodEntryById(id);
    if (!foodEntry) {
      throw new HttpException(
        'Food entry does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.foodEntry.update({
      where: { id },
      data: { ...foodEntryUpdated, day, month },
    });
  }

  async updateFoodEntryPrice(id: number, price: number, userId?: number) {
    const foodEntry = await this.findFoodEntryById(id);
    if (!foodEntry) {
      throw new HttpException(
        'Food entry does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new HttpException(
        'Invalid userId: User does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (userId && foodEntry.userId !== userId) {
      throw new HttpException(
        'User does not have access to this food entry',
        HttpStatus.FORBIDDEN,
      );
    }

    const month = getDateMonth(new Date(foodEntry.dateTime));

    const getUserMonthlyExpenseResponse = await this.getUserMonthlyExpense(
      month,
      userId,
    );
    const userMonthlyExpenses = getUserMonthlyExpenseResponse._sum.price || 0;
    if (
      userMonthlyExpenses < user.monthlyThresholdLimitOfMoney &&
      userMonthlyExpenses + price - foodEntry.price >=
        user.monthlyThresholdLimitOfMoney
    ) {
      await this.notificationsService.createNotification(
        userId,
        "You've reached your montly limit of expenses.",
      );
    }

    return this.prisma.foodEntry.update({
      where: { id },
      data: { price },
    });
  }

  async deleteFoodEntry(id: number) {
    const foodEntry = await this.findFoodEntryById(id);
    if (!foodEntry) {
      throw new HttpException(
        'Food entry does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.foodEntry.delete({ where: { id } });
  }

  getAverageNumberOfCaloriesAddedPerUser() {
    const oneWeekBefore = getOneWeekBefore();
    return this.prisma.foodEntry.groupBy({
      by: ['userId'],
      _avg: {
        calories: true,
      },
      where: {
        dateTime: {
          gte: oneWeekBefore,
          lte: new Date(new Date().setUTCHours(23, 59, 59, 999)), // till current day
        },
      },
    });
  }
}
