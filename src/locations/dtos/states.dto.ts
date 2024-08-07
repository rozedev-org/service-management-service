import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class getStatesDto extends PageOptionsDto {}

export class CreateStateDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class UpdateStatesDto extends PartialType(CreateStateDto) {}
