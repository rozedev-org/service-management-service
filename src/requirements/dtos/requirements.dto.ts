import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty } from '@nestjs/swagger';
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

class UpdateRequirementFieldValueDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  value: string;
}

export class UpdateRequirementsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  stateId?: number;

  @ApiProperty({
    isArray: true,
    type: UpdateRequirementFieldValueDto,
    required: false
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRequirementFieldValueDto)
  @IsOptional()
  requirementFieldValue: UpdateRequirementFieldValueDto[];
}
