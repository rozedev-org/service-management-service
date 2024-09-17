import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { getStatesDto, UpdateStatesDto } from '@app/locations/dtos/states.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, State } from '@prisma/client';

@Injectable()
export class StatesService {
  constructor(private prisma: PrismaService) {}

  async state({ id }: FindByIdDto): Promise<State> {
    const stateData = await this.prisma.state.findUnique({
      where: { id },
      include: {
        cities: {
          include: {
            towns: true
          }
        }
      }
    });
    if (!stateData) {
      throw new NotFoundException(`State ${id} not found`);
    }
    return stateData;
  }
  async states(params: getStatesDto): Promise<PageDto<State>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.state.count();
    const data = await this.prisma.state.findMany({ skip, take });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });
    return { data, meta: pageMetaDto };
  }

  async create(data: Prisma.StateCreateInput): Promise<State> {
    return this.prisma.state.create({
      data
    });
  }
  async update(params: FindByIdDto, data: UpdateStatesDto): Promise<State> {
    const { id } = params;
    await this.state({ id });
    return this.prisma.state.update({
      where: { id },
      data
    });
  }
  async remove({ id }: FindByIdDto): Promise<State> {
    await this.state({ id });
    return this.prisma.state.delete({
      where: { id }
    });
  }
}
