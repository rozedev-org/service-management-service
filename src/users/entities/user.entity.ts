import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  isEnabled: boolean;
  @ApiProperty()
  loginTries: number;
  @ApiProperty()
  profileId: number;
}

class Requirement {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  stateId: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class RequirementsByUser {
  @ApiProperty()
  id: number;
  @ApiProperty()
  @ApiProperty()
  title: string;
  @ApiProperty()
  secuence: number;
  @ApiProperty({ type: [Requirement] })
  requirement: Requirement[];
}
