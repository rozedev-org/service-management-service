import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class getTownDto extends PageOptionsDto {}

export class CreateTownDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  cityId: number;
}

export class UpdateTownDto extends PartialType(CreateTownDto) {}
