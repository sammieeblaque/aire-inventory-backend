import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  costPrice: number;

  @IsNumber()
  @IsPositive()
  sellingPrice: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
