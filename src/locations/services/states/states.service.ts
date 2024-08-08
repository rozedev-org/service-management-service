import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { getStatesDto, UpdateStatesDto } from '@app/locations/dtos/states.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, States } from '@prisma/client';

@Injectable()
export class StatesService {
  constructor(private prisma: PrismaService) {}

  async state({ id }: FindByIdDto): Promise<States> {
    const stateData = await this.prisma.states.findUnique({
      where: { id },
      include: {
        cities: {
          include: {
            Towns: true
          }
        }
      }
    });
    if (!stateData) {
      throw new NotFoundException(`State ${id} not found`);
    }
    return stateData;
  }
  async states(params: getStatesDto): Promise<PageDto<States>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.states.count();
    const data = await this.prisma.states.findMany({ skip, take });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });
    return { data, meta: pageMetaDto };
  }

  async create(data: Prisma.StatesCreateInput): Promise<States> {
    return this.prisma.states.create({
      data
    });
  }
  async update(params: FindByIdDto, data: UpdateStatesDto): Promise<States> {
    const { id } = params;
    await this.state({ id });
    return this.prisma.states.update({
      where: { id },
      data
    });
  }
  async remove({ id }: FindByIdDto): Promise<States> {
    await this.state({ id });
    return this.prisma.states.delete({
      where: { id }
    });
  }
}
