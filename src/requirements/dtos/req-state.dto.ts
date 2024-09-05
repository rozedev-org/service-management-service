import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetReqStatesDto extends PageOptionsDto {}

export class CreateReqStateDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  secuence: number;

  @ApiProperty()
  @IsString()
  stateType: string;
}

export class UpdateReqStateDto extends PartialType(CreateReqStateDto) {}
