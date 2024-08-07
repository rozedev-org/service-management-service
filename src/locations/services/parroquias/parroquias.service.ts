import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateParroquiaDto,
  getParroquiaDto,
  UpdateParroquiaDto
} from '@app/locations/dtos/parroquia.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Parroquia, Prisma } from '@prisma/client';

@Injectable()
export class ParroquiasService {
  constructor(private prisma: PrismaService) {}

  async parroquia({ id }: FindByIdDto): Promise<Parroquia> {
    const parroquiaData = await this.prisma.parroquia.findUnique({
      where: { id }
    });
    if (!parroquiaData) {
      throw new NotFoundException(`Parroquia ${id} not found`);
    }
    return parroquiaData;
  }
  async parroquias(params: getParroquiaDto): Promise<PageDto<Parroquia>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.parroquia.count();
    const data = await this.prisma.parroquia.findMany({ skip, take });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });
    return { data, meta: pageMetaDto };
  }

  async create(data: CreateParroquiaDto): Promise<Parroquia> {
    return this.prisma.parroquia.create({
      data
    });
  }
  async update(
    params: FindByIdDto,
    data: UpdateParroquiaDto
  ): Promise<Parroquia> {
    const { id } = params;
    await this.parroquia({ id });
    return this.prisma.parroquia.update({
      where: { id },
      data
    });
  }
  async remove({ id }: FindByIdDto): Promise<Parroquia> {
    await this.parroquia({ id });
    return this.prisma.parroquia.delete({
      where: { id }
    });
  }
}
