import { ApiProperty } from '@nestjs/swagger';
import {
  IsCurrency,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Currency } from '../entities/wallet.entity';

export class CreateWalletDto {
  @ApiProperty({
    example: '123445',
    description: 'User ID',
    type: 'string',
  })
  @IsString({
    message: 'User ID must be a string',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: 'USD',
    description: 'Currency',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString({
    message: 'Currency must be a string',
  })
  @IsCurrency({
    symbol: 'USD',
  })
  currency?: Currency;
}

export class TransactionDto {
  // amount
  @ApiProperty({
    example: 'N100',
    description: 'Amount',
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  // description
  @ApiProperty({
    example: 'testing transaction',
    description: 'Description',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  description?: string;
}
