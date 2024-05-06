import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { DeleteReqTypeFieldDto } from '@app/requirements/dtos/req-type-field.dto';
import {
  CreateReqTypeDto,
  GetReqTypesDto,
  UpdateReqTypeDto
} from '@app/requirements/dtos/req-type.dto';
import {
  ReqTypeEntity,
  ReqTypeFieldEntity
} from '@app/requirements/entities/req-type.entity';
import { ReqTypeFieldService } from '@app/requirements/services/req-type/req-type-field.service';
import { ReqTypeService } from '@app/requirements/services/req-type/req-type.service';
import { ApiPaginatedResponse } from '@common/decorators/ApiPaginatedResponse';
import { PageDto } from '@common/dtos/page.dto';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequirementType, RequirementTypeField } from '@prisma/client';

@ApiTags('requirement types')
@UseGuards(JwtAuthGuard)
@Controller('/requirements/type')
export class ReqTypeController {
  constructor(
    private readonly reqTypeService: ReqTypeService,
    private readonly reqTypeFieldService: ReqTypeFieldService
  ) {}

  @Get(':id')
  @ApiOkResponse({ type: ReqTypeEntity })
  getReqType(@Param() params: FindByIdDto): Promise<ReqTypeEntity> {
    return this.reqTypeService.reqType(params);
  }

  @Get()
  @ApiPaginatedResponse(ReqTypeEntity)
  getReqTypes(
    @Query() queryParams: GetReqTypesDto
  ): Promise<PageDto<ReqTypeEntity>> {
    return this.reqTypeService.reqTypes(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: ReqTypeEntity })
  createReqType(@Body() payload: CreateReqTypeDto): Promise<RequirementType> {
    return this.reqTypeService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReqTypeEntity })
  updateReqType(
    @Param() params: FindByIdDto,
    @Body() payload: UpdateReqTypeDto
  ): Promise<RequirementType> {
    return this.reqTypeService.update(params, payload);
  }

  @Delete('field')
  @ApiOkResponse({ type: ReqTypeFieldEntity })
  deleteReqTypeField(
    @Body() payload: DeleteReqTypeFieldDto
  ): Promise<RequirementTypeField[]> {
    return this.reqTypeFieldService.remove(payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReqTypeEntity })
  deleteReqType(@Param() params: FindByIdDto): Promise<RequirementType> {
    return this.reqTypeService.remove(params);
  }
}
