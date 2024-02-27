import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { GetUsersDto } from '../dtos/users.dto';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user({ id }: FindByIdDto): Promise<User> {
    const userData = await this.prisma.user.findUnique({
      where: { id }
    });
    if (!userData) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return userData;
  }

  async users(params: GetUsersDto): Promise<PageDto<User>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.user.count();
    const data = await this.prisma.user.findMany({
      skip,
      take
    });

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });

    return {
      data,
      meta: pageMetaDto
    };
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data
    });
  }
}
