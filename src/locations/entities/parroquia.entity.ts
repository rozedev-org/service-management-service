import { ApiProperty } from '@nestjs/swagger';
import { Parroquia } from '@prisma/client';

export class ParroquiaEntity implements Parroquia {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  cityId: number;
}
