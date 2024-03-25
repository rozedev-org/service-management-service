import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Requirement } from '@prisma/client';
import {
  CreateRequirementsDto,
  GetRequirementsDto,
  UpdateRequirementsDto
} from '../dtos/requirements.dto';
import { PageDto } from '@common/dtos/page.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { UsersService } from '@app/users/services/users.service';

@Injectable()
export class RequirementsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService
  ) {}

  async requirement({ id }: FindByIdDto): Promise<Requirement> {
    const requirementData = await this.prisma.requirement.findUnique({
      where: { id },
      include: {
        user: true
      }
    });
    if (!requirementData) {
      throw new NotFoundException(`Requirement ${id} not found`);
    }
    return requirementData;
  }

  async requirements(
    params: GetRequirementsDto
  ): Promise<PageDto<Requirement>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.requirement.count();
    const data = await this.prisma.requirement.findMany({
      skip,
      take,
      include: {
        user: true
      }
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

  async create(data: CreateRequirementsDto): Promise<Requirement> {
    data.userId && (await this.userService.user({ id: data.userId }));
    return this.prisma.requirement.create({
      data
    });
  }

  async update(
    params: FindByIdDto,
    data: UpdateRequirementsDto
  ): Promise<Requirement> {
    const { id } = params;

    await this.requirement({ id });
    return this.prisma.requirement.update({
      where: { id },
      data
    });
  }

  async remove({ id }: FindByIdDto): Promise<Requirement> {
    await this.requirement({ id });
    return this.prisma.requirement.delete({
      where: { id }
    });
  }
}
