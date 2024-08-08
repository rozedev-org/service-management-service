import { ApiProperty } from '@nestjs/swagger';
import { Town } from '@prisma/client';

export class TownEntity implements Town {
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
