import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateStateDto,
  getStatesDto,
  UpdateStatesDto
} from '@app/locations/dtos/states.dto';
import { StateEntity } from '@app/locations/entities/states.entity';
import { StatesService } from '@app/locations/services/states/states.service';
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
import { States } from '@prisma/client';

@ApiTags('States')
@UseGuards(JwtAuthGuard)
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get(':id')
  @ApiOkResponse({ type: StateEntity })
  getState(@Param() params: FindByIdDto): Promise<States> {
    return this.statesService.state(params);
  }

  @Get()
  @ApiPaginatedResponse(StateEntity)
  async getStates(
    @Query() queryParams: getStatesDto
  ): Promise<PageDto<States>> {
    return this.statesService.states(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: StateEntity })
  async createState(@Body() payload: CreateStateDto): Promise<States> {
    return this.statesService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: StateEntity })
  updateState(@Param() params: FindByIdDto, @Body() payload: UpdateStatesDto) {
    return this.statesService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: StateEntity })
  removeState(@Param() params: FindByIdDto) {
    return this.statesService.remove(params);
  }
}
