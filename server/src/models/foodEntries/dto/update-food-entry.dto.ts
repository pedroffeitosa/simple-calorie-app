import {
  IsNumber,
  Min,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateFoodEntryDto {
  @IsDateString()
  dateTime?: Date;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @Min(1)
  calories?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
