import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateTownDto,
  getTownDto,
  UpdateTownDto
} from '@app/locations/dtos/towns.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Town } from '@prisma/client';
import { CitiesService } from '../cities/cities.service';

@Injectable()
export class TownsService {
  constructor(
    private prisma: PrismaService,
    private citiesService: CitiesService
  ) {}

  async town({ id }: FindByIdDto): Promise<Town> {
    const townData = await this.prisma.town.findUnique({
      where: { id },
      include: {
        city: true
      }
    });
    if (!townData) {
      throw new NotFoundException(`Town ${id} not found`);
    }
    return townData;
  }
  async towns(params: getTownDto): Promise<PageDto<Town>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.town.count();
    const data = await this.prisma.town.findMany({ skip, take });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });
    return { data, meta: pageMetaDto };
  }

  async create(data: CreateTownDto): Promise<Town> {
    return this.prisma.town.create({
      data
    });
  }
  async update(params: FindByIdDto, data: UpdateTownDto): Promise<Town> {
    const { id } = params;
    await this.town({ id });
    return this.prisma.town.update({
      where: { id },
      data
    });
  }
  async remove({ id }: FindByIdDto): Promise<Town> {
    await this.town({ id });
    return this.prisma.town.delete({
      where: { id }
    });
  }
}
