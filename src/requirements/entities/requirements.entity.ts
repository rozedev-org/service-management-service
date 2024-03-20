import { ApiProperty } from '@nestjs/swagger';
import { Requirement } from '@prisma/client';

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
}
