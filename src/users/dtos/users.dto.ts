import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersDto extends PageOptionsDto {}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  userName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsNumber()
  profileId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  loginTries: number;
  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  isEnabled: boolean;
}
