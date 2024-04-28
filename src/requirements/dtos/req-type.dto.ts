import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetReqTypesDto extends PageOptionsDto {}

export class CreateReqTypeDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class UpdateReqTypeDto extends PartialType(CreateReqTypeDto) {}
