import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto, GetUsersDto, UpdateUserDto } from '../dtos/users.dto';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';
import * as bcrypt from 'bcrypt';
import { RequirementsByUser } from '../entities/user.entity';
import { ProfilesService } from './profiles.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private profileService: ProfilesService
  ) {}

  async findUsername(userName: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { userName }
    });

    if (!user) {
      throw new NotFoundException(`User ${userName} not found`);
    }

    return user;
  }

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

  async create(data: CreateUserDto): Promise<User> {
    const { profileId } = data;

    const userExists = await this.prisma.user.findUnique({
      where: { userName: data.userName }
    });

    if (userExists) {
      throw new BadRequestException(`User ${data.userName} already exists`);
    }

    await this.profileService.profile({ id: profileId });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });
  }

  async update(
    params: FindByIdDto,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    const { id } = params;
    await this.user({ id });
    // const { profileId } = data;
    // await this.profileService.profile({ id: profileId });

    return this.prisma.user.update({
      where: { id },
      data
    });
  }

  async remove({ id }: FindByIdDto): Promise<User> {
    await this.user({ id });

    return this.prisma.user.delete({
      where: { id }
    });
  }

  async requirementsByUser({ id }: FindByIdDto): Promise<RequirementsByUser[]> {
    await this.user({ id });

    return await this.prisma.requirementState.findMany({
      select: {
        id: true,
        title: true,
        secuence: true,
        requirement: {
          where: {
            userId: id
          }
        }
      },
      orderBy: {
        secuence: 'asc'
      }
    });
  }
}
