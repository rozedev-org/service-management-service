import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';

export class ProfileEntity implements Profile {
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
