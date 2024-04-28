import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateReqTypeDto,
  GetReqTypesDto,
  UpdateReqTypeDto
} from '@app/requirements/dtos/req-type.dto';
import { ReqTypeService } from '@app/requirements/services/req-type/req-type.service';
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
import { ApiTags } from '@nestjs/swagger';
import { RequirementType } from '@prisma/client';

@ApiTags('requirement types')
@UseGuards(JwtAuthGuard)
@Controller('/requirements/type')
export class ReqTypeController {
  constructor(private readonly reqTypeService: ReqTypeService) {}

  @Get(':id')
  getReqType(@Param() params: FindByIdDto): Promise<RequirementType> {
    return this.reqTypeService.reqType(params);
  }

  @Get()
  getReqTypes(
    @Query() queryParams: GetReqTypesDto
  ): Promise<PageDto<RequirementType>> {
    return this.reqTypeService.reqTypes(queryParams);
  }

  @Post()
  createReqType(@Body() payload: CreateReqTypeDto): Promise<RequirementType> {
    return this.reqTypeService.create(payload);
  }

  @Put(':id')
  updateReqType(
    @Param() params: FindByIdDto,
    @Body() payload: UpdateReqTypeDto
  ): Promise<RequirementType> {
    return this.reqTypeService.update(params, payload);
  }

  @Delete(':id')
  deleteReqType(@Param() params: FindByIdDto): Promise<RequirementType> {
    return this.reqTypeService.remove(params);
  }
}
