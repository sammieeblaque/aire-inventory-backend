import { IsString, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsUUID('4')
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
