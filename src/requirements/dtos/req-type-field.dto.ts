import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateReqTypeFieldDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  requirementTypeId: number;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsBoolean()
  isOptional: boolean;

  @ApiProperty()
  @IsBoolean()
  isRequired: boolean;

  @IsOptional()
  options: any;
}

export class UpdateReqTypeFieldDto extends PartialType(CreateReqTypeFieldDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isOptional?: boolean;
}

export class DeleteReqTypeFieldDto {
  @ApiProperty({ type: [Number] })
  @IsArray()
  requirementsTypeFieldsDeleted: number[];
}
