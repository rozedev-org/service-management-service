import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReqFieldValueDto {
  @ApiProperty()
  @IsString()
  value: string;

  @ApiProperty()
  @IsNumber()
  requirementTypeFieldId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  requirementId?: number;
}
