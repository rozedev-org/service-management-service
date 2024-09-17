import { PageOptionsDto } from '@common/dtos/page.dto';
import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetProfileDto extends PageOptionsDto {}

export class CreateProfileDto {
  @IsString()
  name: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
