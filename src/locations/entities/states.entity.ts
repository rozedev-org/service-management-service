import { ApiProperty } from '@nestjs/swagger';
import { States } from '@prisma/client';

export class StateEntity implements States {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
