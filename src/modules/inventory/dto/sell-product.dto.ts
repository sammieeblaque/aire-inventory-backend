import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class SellProductDto {
  @ApiProperty({
    example: 'Hair Cream',
    description: 'product name',
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '10',
    description: 'product quantity',
    type: 'number',
  })
  @IsNumber()
  @IsPositive()
  quantity: number;
}
