import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCustomerDto extends PageOptionsDto {}

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  name: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
