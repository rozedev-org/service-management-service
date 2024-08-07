import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateParroquiaDto,
  getParroquiaDto,
  UpdateParroquiaDto
} from '@app/locations/dtos/parroquia.dto';
import { ParroquiaEntity } from '@app/locations/entities/parroquia.entity';
import { ParroquiasService } from '@app/locations/services/parroquias/parroquias.service';
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
import { Parroquia } from '@prisma/client';

@ApiTags('Parroquias')
@UseGuards(JwtAuthGuard)
@Controller('parroquias')
export class ParroquiasController {
  constructor(private readonly parroquiasService: ParroquiasService) {}

  @Get(':id')
  @ApiOkResponse({ type: ParroquiaEntity })
  getParroquia(@Param() params: FindByIdDto): Promise<Parroquia> {
    return this.parroquiasService.parroquia(params);
  }

  @Get()
  @ApiPaginatedResponse(ParroquiaEntity)
  async getParroquias(
    @Query() queryParams: getParroquiaDto
  ): Promise<PageDto<Parroquia>> {
    return this.parroquiasService.parroquias(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: ParroquiaEntity })
  async createState(@Body() payload: CreateParroquiaDto): Promise<Parroquia> {
    return this.parroquiasService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: ParroquiaEntity })
  updateState(
    @Param() params: FindByIdDto,
    @Body() payload: UpdateParroquiaDto
  ) {
    return this.parroquiasService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ParroquiaEntity })
  removeState(@Param() params: FindByIdDto) {
    return this.parroquiasService.remove(params);
  }
}
