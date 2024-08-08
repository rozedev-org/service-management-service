import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class getCitiesDto extends PageOptionsDto {}

export class CreateCitiesDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  stateId: number;
}

export class UpdateCitiesDto extends PartialType(CreateCitiesDto) {}
