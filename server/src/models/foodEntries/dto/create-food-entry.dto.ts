import {
  IsNumber,
  Min,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateFoodEntryDto {
  @IsInt()
  userId: number;

  @IsDateString()
  dateTime: Date;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  calories: number;

  @IsNumber()
  price?: number;
}
