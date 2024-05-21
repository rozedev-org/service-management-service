import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { ReqFieldValueDto } from './req-field-value.dto';
import { Type } from 'class-transformer';

export class GetRequirementsDto extends PageOptionsDto {}

export class CreateRequirementsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  userId: number | null;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  stateId: number;

  @ApiProperty()
  @IsNumber()
  requirementTypeId: number;

  @ApiProperty({ isArray: true, type: ReqFieldValueDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReqFieldValueDto)
  requirementFieldValue: ReqFieldValueDto[];
}

export class UpdateRequirementsDto extends PartialType(CreateRequirementsDto) {}
