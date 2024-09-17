import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateAuditDto,
  GetAuditDto
} from '@app/requirements/dtos/req-audit.dto';
import { ReqAuditEntity } from '@app/requirements/entities/req-audit.entity';
import { AuditService } from '@app/requirements/services/audit/audit.service';
import { ApiPaginatedResponse } from '@common/decorators/ApiPaginatedResponse';
import { PageDto } from '@common/dtos/page.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequirementsAudit } from '@prisma/client';
@ApiTags('Audit')
@UseGuards(JwtAuthGuard)
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get(':id')
  @ApiOkResponse({ type: ReqAuditEntity })
  getAudit(@Param() params: FindByIdDto): Promise<RequirementsAudit> {
    return this.auditService.audit(params);
  }

  @Get()
  @ApiPaginatedResponse(ReqAuditEntity)
  async getAudits(
    @Query() queryParams: GetAuditDto
  ): Promise<PageDto<RequirementsAudit>> {
    return this.auditService.audits(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: ReqAuditEntity })
  async createAudit(
    @Body() payload: CreateAuditDto
  ): Promise<RequirementsAudit> {
    return this.auditService.create(payload);
  }
}
