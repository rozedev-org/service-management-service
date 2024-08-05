import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { GetProfileDto } from '../dtos/profile.dto';
import { PageDto } from '@common/dtos/page.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async findProfile(name: string): Promise<Profile> {
    const profile = await this.prisma.profile.findFirst({ where: { name } });
    if (!profile) {
      throw new NotFoundException(`Profile ${name} not found`);
    }

    return profile;
  }

  async profile({ id }: FindByIdDto): Promise<Profile> {
    const profileData = await this.prisma.profile.findUnique({
      where: { id }
    });
    if (!profileData) {
      throw new NotFoundException(`Profile ${id} not found`);
    }
    return profileData;
  }

  async profiles(params: GetProfileDto): Promise<PageDto<Profile>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.profile.count();
    const data = await this.prisma.profile.findMany({
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
  async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({
      data: {
        ...data
      }
    });
  }
  async update(
    params: FindByIdDto,
    data: Prisma.ProfileUpdateInput
  ): Promise<Profile> {
    const { id } = params;
    await this.profile({ id });
    return this.prisma.profile.update({
      where: { id },
      data
    });
  }
  async remove({ id }: FindByIdDto): Promise<Profile> {
    await this.profile({ id });
    return this.prisma.profile.delete({
      where: { id }
    });
  }
}
