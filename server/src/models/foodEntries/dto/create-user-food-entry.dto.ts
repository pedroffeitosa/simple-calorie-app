import {
  IsNumber,
  Min,
  IsString,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateUserFoodEntryDto {
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
