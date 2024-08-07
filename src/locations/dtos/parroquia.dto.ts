import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class getParroquiaDto extends PageOptionsDto {}

export class CreateParroquiaDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  cityId: number;
}

export class UpdateParroquiaDto extends PartialType(CreateParroquiaDto) {}
