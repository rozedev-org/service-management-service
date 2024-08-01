import { ApiProperty } from '@nestjs/swagger';
import { Requirement } from '@prisma/client';
import { ReqStateEntity } from './req-state.entity';
import { RequirementFieldValueEntity } from './req-field-value.entity';
import { ReqTypeFieldEntity } from './req-type.entity';
import { UserEntity } from '@app/users/entities/user.entity';

export class RequirementsEntity implements Requirement {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  stateId: number;
  @ApiProperty()
  requirementTypeId: number;
  @ApiProperty({ type: UserEntity })
  user: null | UserEntity;
}

export class ReqActionsEntity {
  @ApiProperty()
  current: ReqStateEntity;
  @ApiProperty({ type: [ReqStateEntity] })
  remaining: ReqStateEntity[];
}

class RequirementFieldValue extends RequirementFieldValueEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  value: string;
  @ApiProperty()
  requirementTypeFieldId: number;
  @ApiProperty()
  requirementId: number;

  @ApiProperty({ type: ReqTypeFieldEntity })
  requirementTypeField: ReqTypeFieldEntity;
}

export class RequirementEntity extends RequirementsEntity {
  @ApiProperty({ type: [RequirementFieldValue] })
  requirementFieldValue: RequirementFieldValue[];
}
