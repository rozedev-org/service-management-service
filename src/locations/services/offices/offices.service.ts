import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateOfficesDto,
  getOfficesDto,
  UpdateOfficesDto
} from '@app/locations/dtos/offices.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Office } from '@prisma/client';

@Injectable()
export class OfficesService {
  constructor(private prisma: PrismaService) {}

  async office({ id }: FindByIdDto): Promise<Office> {
    const OfficeData = await this.prisma.office.findUnique({
      where: { id },
      include: {
        town: true
      }
    });
    if (!OfficeData) {
      throw new NotFoundException(`Office ${id} not found`);
    }
    return OfficeData;
  }
  async offices(params: getOfficesDto): Promise<PageDto<Office>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.office.count();
    const data = await this.prisma.office.findMany({ skip, take });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });
    return { data, meta: pageMetaDto };
  }

  async create(data: CreateOfficesDto): Promise<Office> {
    return this.prisma.office.create({
      data
    });
  }
  async update(params: FindByIdDto, data: UpdateOfficesDto): Promise<Office> {
    const { id } = params;
    await this.office({ id });
    return this.prisma.office.update({
      where: { id },
      data
    });
  }
  async remove({ id }: FindByIdDto): Promise<Office> {
    await this.office({ id });
    return this.prisma.office.delete({
      where: { id }
    });
  }
}
