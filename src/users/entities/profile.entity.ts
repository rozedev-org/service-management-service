import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';

export class ProfileEntity implements Profile {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
