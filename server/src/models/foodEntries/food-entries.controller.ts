import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from '../users/entities/role.enum';
import { CreateFoodEntryDto } from './dto/create-food-entry.dto';
import { CreateUserFoodEntryDto } from './dto/create-user-food-entry.dto';
import { GetUserFoodEntries } from './dto/get-user-food-entries.query';
import { UpdateFoodEntryDto } from './dto/update-food-entry.dto';
import { UpdateUserFoodEntryPriceDto } from './dto/update-user-food-entry-price.dto';
import { FoodEntriesService } from './food-entries.service';

@Controller('food-entries')
export class FoodEntriesController {
  constructor(private foodEntriesService: FoodEntriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('user')
  createUserFoodEntry(
    @Request() req,
    @Body() createFoodEntryDto: CreateUserFoodEntryDto,
  ) {
    return this.foodEntriesService.createFoodEntry(
      createFoodEntryDto,
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUserFoodEntries(@Request() req, @Query() query?: GetUserFoodEntries) {
    return this.foodEntriesService.listUserFoodEntries(req.user.id, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/calories')
  getUserMonthCalories(@Request() req) {
    return this.foodEntriesService.listUserCaloriesPerDay(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:foodEntryId')
  getUserFoodEntry(@Request() req, @Param('foodEntryId') foodEntryId: string) {
    return this.foodEntriesService.findOneById(
      parseInt(foodEntryId),
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/:foodEntryId')
  updateUserFoodEntry(
    @Request() req,
    @Param('foodEntryId') foodEntryId: string,
    @Body() updateUserFoodEntryPriceDto: UpdateUserFoodEntryPriceDto,
  ) {
    return this.foodEntriesService.updateFoodEntryPrice(
      Number(foodEntryId),
      updateUserFoodEntryPriceDto.price,
      req.user.id,
    );
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createFoodEntry(@Body() createFoodEntryDto: CreateFoodEntryDto) {
    return this.foodEntriesService.createFoodEntry(
      createFoodEntryDto,
      createFoodEntryDto.userId,
    );
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllFoodEntries(@Query() query?: GetUserFoodEntries) {
    return this.foodEntriesService.listAllFoodEntries(query);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('count')
  getAllFoodEntriesCount(@Query() query: GetUserFoodEntries) {
    return this.foodEntriesService.countAllFoodEntries(query);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('average-calories')
  getAverageNumberOfCaloriesPerUser() {
    return this.foodEntriesService.getAverageNumberOfCaloriesAddedPerUser();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':foodEntryId')
  deleteFoodEntry(@Param('foodEntryId') foodEntryId: string) {
    return this.foodEntriesService.deleteFoodEntry(Number(foodEntryId));
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':foodEntryId')
  getFoodEntry(@Param('foodEntryId') foodEntryId: string) {
    return this.foodEntriesService.findOneById(Number(foodEntryId));
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':foodEntryId')
  updateFoodEntry(
    @Param('foodEntryId') foodEntryId: string,
    @Body() updateFoodEntryDto: UpdateFoodEntryDto,
  ) {
    return this.foodEntriesService.updateFoodEntry(
      Number(foodEntryId),
      updateFoodEntryDto,
    );
  }
}
