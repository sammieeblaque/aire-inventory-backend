import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/@types';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUsecase extends UseCase {
  private logger = new Logger(CreateUserUsecase.name);

  constructor(private readonly userService: UsersService) {
    super();
  }

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);
    return user;
  }
}
