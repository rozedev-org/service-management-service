import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class getOfficesDto extends PageOptionsDto {}

export class CreateOfficesDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  townId: number;
}

export class UpdateOfficesDto extends PartialType(CreateOfficesDto) {}
