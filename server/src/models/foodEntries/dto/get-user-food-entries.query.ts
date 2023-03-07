import { IsDateString, IsOptional } from 'class-validator';

export class GetUserFoodEntries {
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
