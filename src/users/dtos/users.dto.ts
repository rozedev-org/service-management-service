import { PageOptionsDto } from '@common/dtos/page.dto';
import { IsString } from 'class-validator';

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
}
