import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Hair Cream',
    description: 'product name',
    type: 'string',
  })
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
