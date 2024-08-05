import { PageOptionsDto } from '@common/dtos/page.dto';
import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateProfileDto } from './profile.dto';

export class GetUsersDto extends PageOptionsDto {}

export class CreateUserDto {
  @IsString()
  userName: string;
  @IsString()
  lastName: string;
  @IsString()
  firstName: string;
  @IsString()
  password: string;
  Profile: CreateProfileDto;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
