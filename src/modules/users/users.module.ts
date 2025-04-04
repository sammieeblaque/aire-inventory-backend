import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashingService } from '../../@shared/lib/hashing/hashing.service';
import { BcryptService } from 'src/@shared/lib/hashing/bcrypt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { WalletModule } from '../wallet/wallet.module';
import { GetUsersUsecase } from './usecases/getUsers.usecase';
import { BrokerService } from 'src/@shared/broker.service';
import { CreateUserUsecase } from './usecases/createUser.usecase';
import { RemoveUserUsecase } from './usecases/removeUser.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WalletModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    GetUsersUsecase,
    CreateUserUsecase,
    RemoveUserUsecase,
    BrokerService,
  ],
})
export class UsersModule {}
