import { IsString, IsNumber, IsPositive } from 'class-validator';

export class SellProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
