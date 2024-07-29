import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

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
}

export class UpdateReqTypeFieldDto extends PartialType(CreateReqTypeFieldDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;
}

export class DeleteReqTypeFieldDto {
  @ApiProperty({ type: [Number] })
  @IsArray()
  requirementsTypeFieldsDeleted: number[];
}
