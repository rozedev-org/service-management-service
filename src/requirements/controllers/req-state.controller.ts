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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReqStateService } from '../services/req-state.service';
import { ReqStateEntity } from '../entities/req-state.entity';
import { RequirementState } from '@prisma/client';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { ApiPaginatedResponse } from '@common/decorators/ApiPaginatedResponse';
import {
  CreateReqStateDto,
  GetReqStatesDto,
  UpdateReqStateDto
} from '../dtos/req-state.dto';
import { PageDto } from '@common/dtos/page.dto';

@ApiTags('requirement state')
@Controller('req-state')
export class ReqStateController {
  constructor(private readonly reqStateService: ReqStateService) {}

  @Get(':id')
  @ApiOkResponse({ type: ReqStateEntity })
  getReqState(@Param() params: FindByIdDto): Promise<RequirementState> {
    return this.reqStateService.reqState(params);
  }

  @Get()
  @ApiPaginatedResponse(ReqStateEntity)
  async getReqStates(
    @Query() queryParams: GetReqStatesDto
  ): Promise<PageDto<RequirementState>> {
    return this.reqStateService.reqStates(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: ReqStateEntity })
  async createReqState(
    @Body() payload: CreateReqStateDto
  ): Promise<RequirementState> {
    return this.reqStateService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReqStateEntity })
  update(@Param() params: FindByIdDto, @Body() payload: UpdateReqStateDto) {
    return this.reqStateService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReqStateEntity })
  remove(@Param() params: FindByIdDto) {
    return this.reqStateService.remove(params);
  }
}
