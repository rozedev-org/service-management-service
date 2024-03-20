import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { RequirementsService } from '../services/requirements.service';
import { ApiTags } from '@nestjs/swagger';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { Requirement } from '@prisma/client';
import { PageDto } from '@common/dtos/page.dto';
import {
  CreateRequirementsDto,
  GetRequirementsDto,
  UpdateRequirementsDto
} from '../dtos/requirements.dto';
import { ApiPaginatedResponse } from '@common/decorators/ApiPaginatedResponse';
import { RequirementsEntity } from '../entities/requirements.entity';

@ApiTags('requirements')
@Controller('requirements')
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  @Get(':id')
  getUser(@Param() params: FindByIdDto): Promise<Requirement> {
    return this.requirementsService.requirement(params);
  }

  @Get()
  @ApiPaginatedResponse(RequirementsEntity)
  async getUsers(
    @Query() queryParams: GetRequirementsDto
  ): Promise<PageDto<Requirement>> {
    return this.requirementsService.requirements(queryParams);
  }

  @Post()
  async signupUser(
    @Body() payload: CreateRequirementsDto
  ): Promise<Requirement> {
    return this.requirementsService.create(payload);
  }

  @Put(':id')
  update(@Param() params: FindByIdDto, @Body() payload: UpdateRequirementsDto) {
    return this.requirementsService.update(params, payload);
  }

  @Delete(':id')
  remove(@Param() params: FindByIdDto) {
    return this.requirementsService.remove(params);
  }
}
