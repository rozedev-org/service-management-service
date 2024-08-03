import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
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