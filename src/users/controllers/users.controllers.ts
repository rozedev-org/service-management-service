import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { UsersService } from '../services/users.service';
import { CreateUserDto, GetUsersDto } from '../dtos/users.dto';
import { FindByIdDto } from '@app/dtos/generic.dto';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param() params: FindByIdDto): Promise<UserModel> {
    return this.usersService.user(params);
  }

  @Get()
  async getUsers(@Query() queryParams: GetUsersDto) {
    return this.usersService.users(queryParams);
  }

  @Post()
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.usersService.createUser(userData);
  }
}
