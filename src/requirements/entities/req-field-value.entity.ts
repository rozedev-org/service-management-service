import { RequirementFieldValue } from '@prisma/client';

export class RequirementFieldValueEntity implements RequirementFieldValue {
  id: number;
  value: string;
  requirementTypeFieldId: number;
  requirementId: number;
}
