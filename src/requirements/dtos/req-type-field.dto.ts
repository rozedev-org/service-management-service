import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}

export class UpdateReqTypeFieldDto extends PartialType(CreateReqTypeFieldDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;
}
