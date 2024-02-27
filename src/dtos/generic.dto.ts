import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class GetGenericsDataDto extends PageOptionsDto {}

export class GetGenericDataDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number;
}

export class CreateGenericDataDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateGenericDataDto extends PartialType(CreateGenericDataDto) {}

export class FindByIdDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  id: number;
}
