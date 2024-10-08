import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';
import { UpdateReqTypeFieldDto } from './req-type-field.dto';

export class GetReqTypesDto extends PageOptionsDto {}
class CreateReqTypeFieldDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsBoolean()
  isOptional: boolean;

  @ApiProperty()
  @IsBoolean()
  isRequired: boolean;

  @ApiProperty()
  @IsOptional()
  options: any;
}

export class CreateReqTypeDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty({ isArray: true, type: CreateReqTypeFieldDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReqTypeFieldDto)
  requirementTypeField: CreateReqTypeFieldDto[];
}

export class UpdateReqTypeDto extends PartialType(
  OmitType(CreateReqTypeDto, ['requirementTypeField'] as const)
) {
  @ApiProperty({ isArray: true, type: UpdateReqTypeFieldDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateReqTypeFieldDto)
  requirementTypeField?: UpdateReqTypeFieldDto[];
}
