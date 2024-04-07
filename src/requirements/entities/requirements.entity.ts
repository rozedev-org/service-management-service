import { ApiProperty } from '@nestjs/swagger';
import { Requirement } from '@prisma/client';
import { ReqStateEntity } from './req-state.entity';

export class RequirementsEntity implements Requirement {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  stateId: number;
}

export class ReqActionsEntity {
  @ApiProperty()
  current: ReqStateEntity;
  @ApiProperty({ type: [ReqStateEntity] })
  remaining: ReqStateEntity[];
}
