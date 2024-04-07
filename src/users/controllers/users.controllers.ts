import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UsersService } from '../services/users.service';
import { CreateUserDto, GetUsersDto, UpdateUserDto } from '../dtos/users.dto';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { ApiPaginatedResponse } from '@common/decorators/ApiPaginatedResponse';
import { UserEntity } from '../entities/user.entity';
import { PageDto } from '@common/dtos/page.dto';
import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  getUser(@Param() params: FindByIdDto): Promise<User> {
    return this.usersService.user(params);
  }

  @Get()
  @ApiPaginatedResponse(UserEntity)
  async getUsers(@Query() queryParams: GetUsersDto): Promise<PageDto<User>> {
    return this.usersService.users(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: UserEntity })
  async signupUser(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Param() params: FindByIdDto, @Body() payload: UpdateUserDto) {
    return this.usersService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param() params: FindByIdDto) {
    return this.usersService.remove(params);
  }
}
