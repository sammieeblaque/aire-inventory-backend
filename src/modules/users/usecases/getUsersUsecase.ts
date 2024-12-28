import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/@types';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class GetUsersUsecase extends UseCase {
  private logger = new Logger(GetUsersUsecase.name);

  constructor(private readonly userService: UsersService) {
    super();
  }

  async execute(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }
}
