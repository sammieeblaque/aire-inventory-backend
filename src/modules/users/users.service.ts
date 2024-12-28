import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { WalletService } from '../wallet/wallet.service';
import { HashingService } from '../../@shared/lib/hashing/hashing.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly walletService: WalletService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      ...createUserDto,
      password: await this.hashingService.hashPassword(createUserDto.password),
      wallets: [],
    });

    const createdUser = await this.userRepository.save(user);

    await this.walletService.createWallet({
      userId: createdUser.id,
      currency: 'NGN',
    });

    return this.userRepository.findOne({
      where: { id: createdUser.id },
      relations: ['wallets'],
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = this.userRepository.update(id, updateUserDto);
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    return this.userRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.userRepository.find();
  }

  async remove(id: string) {
    // if user is already deleted
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.softDelete(id);
  }
}
