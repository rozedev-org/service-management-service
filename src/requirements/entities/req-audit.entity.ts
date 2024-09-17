import { ApiProperty } from '@nestjs/swagger';
import { RequirementsAudit } from '@prisma/client';

export class ReqAuditEntity implements RequirementsAudit {
  @ApiProperty()
  id: number;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  newStateId: number;
  @ApiProperty()
  oldStateId: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  requirementId: number;
}
