import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateOfficesDto,
  getOfficesDto,
  UpdateOfficesDto
} from '@app/locations/dtos/offices.dto';
import { OfficeEntity } from '@app/locations/entities/offices.entity';
import { OfficesService } from '@app/locations/services/offices/offices.service';
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
import { Office } from '@prisma/client';

@ApiTags('Office')
@UseGuards(JwtAuthGuard)
@Controller('locations/offices')
export class OfficesController {
  constructor(private readonly officeService: OfficesService) {}

  @Get(':id')
  @ApiOkResponse({ type: OfficeEntity })
  getOffice(@Param() params: FindByIdDto): Promise<Office> {
    return this.officeService.office(params);
  }

  @Get()
  @ApiPaginatedResponse(OfficeEntity)
  async getOffices(
    @Query() queryParams: getOfficesDto
  ): Promise<PageDto<Office>> {
    return this.officeService.offices(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: OfficeEntity })
  async createOffice(@Body() payload: CreateOfficesDto): Promise<Office> {
    return this.officeService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: OfficeEntity })
  updateOffice(
    @Param() params: FindByIdDto,
    @Body() payload: UpdateOfficesDto
  ) {
    return this.officeService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OfficeEntity })
  removeOffice(@Param() params: FindByIdDto) {
    return this.officeService.remove(params);
  }
}
