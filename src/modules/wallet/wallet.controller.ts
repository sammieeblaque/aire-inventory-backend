import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto, TransactionDto } from './dto/create-wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }

  @Get(':userId')
  getWallet(@Param('userId') userId: string) {
    return this.walletService.getWallet(userId);
  }

  @Post(':userId/deposit')
  deposit(
    @Param('userId') userId: string,
    @Body() transactionDto: TransactionDto,
  ) {
    return this.walletService.deposit(userId, transactionDto);
  }

  @Post(':userId/withdraw')
  withdraw(
    @Param('userId') userId: string,
    @Body() transactionDto: TransactionDto,
  ) {
    return this.walletService.withdraw(userId, transactionDto);
  }

  @Post(':userId/transfer/:toUserId')
  transfer(
    @Param('userId') fromUserId: string,
    @Param('toUserId') toUserId: string,
    @Body() transactionDto: TransactionDto,
  ) {
    return this.walletService.transfer(fromUserId, toUserId, transactionDto);
  }

  @Get(':userId/balance')
  getBalance(@Param('userId') userId: string) {
    return this.walletService.getBalance(userId);
  }

  @Get()
  getWallets() {
    return this.walletService.getAllWallets();
  }

  @Patch(':userId/currency')
  updateCurrency(
    @Param('userId') userId: string,
    @Body() currencyDto: { currency: string },
  ) {
    return this.walletService.updateCurrency(userId, currencyDto.currency);
  }
}
