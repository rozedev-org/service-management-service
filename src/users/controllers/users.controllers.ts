import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UsersService } from '../services/users.service';
import { CreateUserDto, GetUsersDto } from '../dtos/users.dto';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { ApiPaginatedResponse } from '@common/decorators/ApiPaginatedResponse';
import { UserEntity } from '../entities/user.entity';
import { PageDto } from '@common/dtos/page.dto';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param() params: FindByIdDto): Promise<User> {
    return this.usersService.user(params);
  }

  @Get()
  @ApiPaginatedResponse(UserEntity)
  async getUsers(@Query() queryParams: GetUsersDto): Promise<PageDto<User>> {
    return this.usersService.users(queryParams);
  }

  @Post()
  async signupUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userData);
  }
}
