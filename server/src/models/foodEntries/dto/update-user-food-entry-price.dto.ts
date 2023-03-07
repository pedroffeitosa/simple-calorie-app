import { IsNumber, Min } from 'class-validator';

export class UpdateUserFoodEntryPriceDto {
  @IsNumber()
  @Min(0)
  price?: number;
}
