import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';
import { BrokerService } from 'src/@shared/broker.service';
import { GetUsersUsecase } from './usecases/getUsersUsecase';
import { CreateUserUsecase } from './usecases/createUserUsecase';
import { User } from './entities/user.entity';
import { IQuery } from 'src/@types';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly brokerService: BrokerService,
    private readonly getUsersUsecase: GetUsersUsecase,
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create users',
    operationId: 'create-users',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.brokerService.runUseCases<User>(
      [this.createUserUsecase],
      createUserDto,
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update users',
    operationId: 'update-users',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users', operationId: 'get-all-users' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async fetchAll(@Query() query: IQuery) {
    const users = await this.brokerService.runUseCases<User[]>(
      [this.getUsersUsecase],
      query,
    );
    return users;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete users',
    operationId: 'delete-users',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
