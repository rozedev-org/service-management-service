import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateCitiesDto,
  getCitiesDto,
  UpdateCitiesDto
} from '@app/locations/dtos/cities.dto';
import { CityEntity } from '@app/locations/entities/citites.entity';
import { CitiesService } from '@app/locations/services/cities/cities.service';
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
import { City } from '@prisma/client';

@ApiTags('Cities')
@UseGuards(JwtAuthGuard)
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get(':id')
  @ApiOkResponse({ type: CityEntity })
  getCity(@Param() params: FindByIdDto): Promise<City> {
    return this.citiesService.city(params);
  }

  @Get()
  @ApiPaginatedResponse(CityEntity)
  async getCitites(@Query() queryParams: getCitiesDto): Promise<PageDto<City>> {
    return this.citiesService.cities(queryParams);
  }

  // @Post()
  // @ApiOkResponse({ type: CityEntity })
  // async createCity(@Body() payload: CreateCitiesDto): Promise<City> {
  //   return this.citiesService.create(payload);
  // }

  @Put(':id')
  @ApiOkResponse({ type: CityEntity })
  updateCity(@Param() params: FindByIdDto, @Body() payload: UpdateCitiesDto) {
    return this.citiesService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CityEntity })
  removeCity(@Param() params: FindByIdDto) {
    return this.citiesService.remove(params);
  }
}
