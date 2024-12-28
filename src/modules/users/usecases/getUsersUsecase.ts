import { Injectable, Logger } from '@nestjs/common';
import { IQuery, PaginatedResponse, UseCase } from 'src/@types';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class GetUsersUsecase extends UseCase<PaginatedResponse<User>> {
  private logger = new Logger(GetUsersUsecase.name);

  constructor(private readonly userService: UsersService) {
    super();
  }

  async execute(
    entityManger: EntityManager,
    query: IQuery,
  ): Promise<PaginatedResponse<User>> {
    const users = await this.userService.findAll(query);
    return users;
  }
}
