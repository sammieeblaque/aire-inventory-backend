import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateWalletDto, TransactionDto } from './dto/create-wallet.dto';
import { Currency, Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private entityManager: EntityManager,
  ) {}

  async createWallet(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const existingWallet = await this.walletRepository.findOne({
      where: { userId: createWalletDto.userId },
    });

    if (existingWallet) {
      throw new BadRequestException('User already has a wallet');
    }

    const wallet = this.walletRepository.create({
      userId: createWalletDto.userId,
      currency: createWalletDto.currency || Currency.USD,
      balance: 0,
    });

    return this.walletRepository.save(wallet);
  }

  async getWallet(userId: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      where: { userId, isActive: true },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async deposit(
    userId: string,
    transactionDto: TransactionDto,
  ): Promise<Wallet> {
    const wallet = await this.getWallet(userId);

    if (transactionDto.amount <= 0) {
      throw new BadRequestException('Deposit amount must be positive');
    }

    wallet.balance = Number(wallet.balance) + Number(transactionDto.amount);
    return this.walletRepository.save(wallet);
  }

  async withdraw(
    userId: string,
    transactionDto: TransactionDto,
  ): Promise<Wallet> {
    const wallet = await this.getWallet(userId);

    if (transactionDto.amount <= 0) {
      throw new BadRequestException('Withdrawal amount must be positive');
    }

    if (wallet.balance < transactionDto.amount) {
      throw new BadRequestException('Insufficient funds');
    }

    wallet.balance -= transactionDto.amount;
    return this.walletRepository.save(wallet);
  }

  async transfer(
    fromUserId: string,
    toUserId: string,
    transactionDto: TransactionDto,
  ) {
    // const transfer_trx = await this.walletRepository.manager.transaction(
    const transfer_trx = await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const fromWallet = await this.getWallet(fromUserId);
        const toWallet = await this.getWallet(toUserId);

        if (fromWallet.currency !== toWallet.currency) {
          throw new BadRequestException('Currency mismatch between wallets');
        }

        if (fromWallet.balance < transactionDto.amount) {
          throw new BadRequestException('Insufficient funds');
        }

        fromWallet.balance =
          Number(fromWallet.balance) - Number(transactionDto.amount);
        toWallet.balance =
          Number(toWallet.balance) + Number(transactionDto.amount);

        return await Promise.allSettled([
          transactionalEntityManager.save(fromWallet),
          transactionalEntityManager.save(toWallet),
        ]);
      },
    );
    return transfer_trx;
  }

  async getBalance(userId: string): Promise<number> {
    const wallet = await this.getWallet(userId);
    return wallet.balance;
  }

  async getAllWallets(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  async updateCurrency(userId: string, currency: string): Promise<Wallet> {
    const wallet = await this.getWallet(userId);
    wallet.currency = currency as Currency;
    return this.walletRepository.save(wallet);
  }
}
