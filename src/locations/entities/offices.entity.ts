import { ApiProperty } from '@nestjs/swagger';
import { Office } from '@prisma/client';

export class OfficeEntity implements Office {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  townId: number;
}
