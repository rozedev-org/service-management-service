import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateTownDto,
  getTownDto,
  UpdateTownDto
} from '@app/locations/dtos/towns.dto';
import { TownEntity } from '@app/locations/entities/towns.entity';
import { TownsService } from '@app/locations/services/towns/towns.service';
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
import { Town } from '@prisma/client';

@ApiTags('town')
@UseGuards(JwtAuthGuard)
@Controller('locations/town')
export class TownsController {
  constructor(private readonly townService: TownsService) {}

  @Get(':id')
  @ApiOkResponse({ type: TownEntity })
  getTown(@Param() params: FindByIdDto): Promise<Town> {
    return this.townService.town(params);
  }

  @Get()
  @ApiPaginatedResponse(TownEntity)
  async getStates(@Query() queryParams: getTownDto): Promise<PageDto<Town>> {
    return this.townService.towns(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: TownEntity })
  async createTown(@Body() payload: CreateTownDto): Promise<Town> {
    return this.townService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: TownEntity })
  updateTown(@Param() params: FindByIdDto, @Body() payload: UpdateTownDto) {
    return this.townService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TownEntity })
  removeTown(@Param() params: FindByIdDto) {
    return this.townService.remove(params);
  }
}
