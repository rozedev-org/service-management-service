import { PageOptionsDto } from '@common/dtos/page.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetAuditDto extends PageOptionsDto {}
export class CreateAuditDto {
  @ApiProperty()
  @IsNumber()
  newStateId: number;
  @ApiProperty()
  @IsNumber()
  oldStateId: number;
  @ApiProperty()
  @IsNumber()
  userId: number;
}
