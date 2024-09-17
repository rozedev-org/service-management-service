import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { GetAuditDto } from '@app/requirements/dtos/req-audit.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, RequirementsAudit } from '@prisma/client';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async audit({ id }: FindByIdDto): Promise<RequirementsAudit> {
    const auditData = await this.prisma.requirementsAudit.findUnique({
      where: { id }
    });
    if (!auditData) {
      throw new NotFoundException(`Requirement ${id} not found`);
    }
    return auditData;
  }

  async audits(params: GetAuditDto): Promise<PageDto<RequirementsAudit>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.requirementsAudit.count();
    const data = await this.prisma.requirementsAudit.findMany({ skip, take });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });
    return { data, meta: pageMetaDto };
  }
  async create(
    data: Prisma.RequirementsAuditCreateInput
  ): Promise<RequirementsAudit> {
    return this.prisma.requirementsAudit.create({ data });
  }
}
