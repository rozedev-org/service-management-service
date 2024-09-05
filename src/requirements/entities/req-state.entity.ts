import { ApiProperty } from '@nestjs/swagger';
import { RequirementState } from '@prisma/client';

export class ReqStateEntity implements RequirementState {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  secuence: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  stateType: string;
}
