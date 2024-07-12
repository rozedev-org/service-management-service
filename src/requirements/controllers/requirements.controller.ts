import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { RequirementsService } from '../services/requirements.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { Requirement } from '@prisma/client';
import { PageDto } from '@common/dtos/page.dto';
import {
  CreateRequirementsDto,
  GetRequirementsDto,
  UpdateRequirementsDto
} from '../dtos/requirements.dto';
import { ApiPaginatedResponse } from '@common/decorators/ApiPaginatedResponse';
import {
  ReqActionsEntity,
  RequirementEntity,
  RequirementsEntity
} from '../entities/requirements.entity';
import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';

@ApiTags('requirements')
@UseGuards(JwtAuthGuard)
@Controller('requirements')
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Get(':id')
  @ApiOkResponse({ type: RequirementEntity })
  getRequirement(@Param() params: FindByIdDto): Promise<Requirement> {
    return this.requirementsService.requirement(params);
  }

  @Get()
  @ApiPaginatedResponse(RequirementsEntity)
  async getRequirements(
    @Query() queryParams: GetRequirementsDto
  ): Promise<PageDto<Requirement>> {
    return this.requirementsService.requirements(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: RequirementsEntity })
  async create(@Body() payload: CreateRequirementsDto) {
    // : Promise<Requirement>
    return this.requirementsService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: RequirementsEntity })
  update(@Param() params: FindByIdDto, @Body() payload: UpdateRequirementsDto) {
    console.log(payload);
    return this.requirementsService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RequirementsEntity })
  remove(@Param() params: FindByIdDto) {
    return this.requirementsService.remove(params);
  }

  @Get('actions/:id')
  @ApiOkResponse({ type: ReqActionsEntity })
  getReqActions(@Param() params: FindByIdDto): Promise<any> {
    return this.requirementsService.getReqActions(params);
  }
}
