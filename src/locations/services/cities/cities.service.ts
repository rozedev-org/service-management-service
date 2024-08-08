import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateCitiesDto,
  getCitiesDto,
  UpdateCitiesDto
} from '@app/locations/dtos/cities.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from '@prisma/client';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async city({ id }: FindByIdDto): Promise<City> {
    const cityData = await this.prisma.city.findUnique({
      where: { id },
      include: {
        State: true,
        Towns: true
      }
    });
    if (!cityData) {
      throw new NotFoundException(`City ${id} not found`);
    }
    return cityData;
  }
  async cities(params: getCitiesDto): Promise<PageDto<City>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.city.count();
    const data = await this.prisma.city.findMany({ skip, take });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });
    return { data, meta: pageMetaDto };
  }

  async create(data: CreateCitiesDto): Promise<City> {
    return this.prisma.city.create({
      data
    });
  }
  async update(params: FindByIdDto, data: UpdateCitiesDto): Promise<City> {
    const { id } = params;
    await this.city({ id });
    return this.prisma.city.update({
      where: { id },
      data
    });
  }
  async remove({ id }: FindByIdDto): Promise<City> {
    await this.city({ id });
    return this.prisma.city.delete({
      where: { id }
    });
  }
}
