import { ApiProperty } from '@nestjs/swagger';

class User {
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
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}

class Requirement {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  stateId: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
  @ApiProperty()
  user: User;
}

export class BoardEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  secuence: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty({ type: [Requirement] })
  Requirement: Requirement[];
}
