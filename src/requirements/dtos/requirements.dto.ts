import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetRequirementsDto extends PageOptionsDto {}

export class CreateRequirementsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  userId: number;

  @ApiProperty()
  @IsString()
  title: string;
}

export class UpdateRequirementsDto extends PartialType(CreateRequirementsDto) {}
