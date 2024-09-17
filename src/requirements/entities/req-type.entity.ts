import { ApiProperty } from '@nestjs/swagger';
import { RequirementType, RequirementTypeField } from '@prisma/client';

export class ReqTypeFieldEntity implements RequirementTypeField {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  requirementTypeId: number;
  @ApiProperty()
  order: number;
  @ApiProperty()
  isOptional: boolean;
  @ApiProperty()
  isRequired: boolean;
  options: any;
}

export class ReqTypeEntity implements RequirementType {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;

  @ApiProperty({ type: ReqTypeFieldEntity, isArray: true })
  requirementTypeField: ReqTypeFieldEntity[];
}
