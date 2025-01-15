import { Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/@types';
import { UsersService } from '../users.service';
import { EntityManager } from 'typeorm';

@Injectable()
export class RemoveUserUsecase extends UseCase {
  private logger = new Logger(RemoveUserUsecase.name);

  constructor(private readonly userService: UsersService) {
    super();
  }

  async execute(
    entityManger: EntityManager,
    data: {
      id: string;
    },
  ): Promise<any> {
    return await this.userService.remove(data.id);
  }
}
