import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Hair Cream',
    description: 'product name',
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'N50',
    description: 'cost price',
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  costPrice: number;

  // selling price
  @ApiProperty({
    example: 'N100',
    description: 'selling price',
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  sellingPrice: number;

  // quantity
  @ApiProperty({
    example: '10',
  })
  @IsNumber()
  @IsPositive()
  quantity: number;
}
