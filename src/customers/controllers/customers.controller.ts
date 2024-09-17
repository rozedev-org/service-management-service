import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
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
import { CustomersService } from '../services/customers.service';
import { CustomerEntity } from '../entities/customer.entity';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { Customer } from '@prisma/client';
import { ApiPaginatedResponse } from '@common/decorators/ApiPaginatedResponse';
import {
  CreateCustomerDto,
  GetCustomerDto,
  UpdateCustomerDto
} from '../dtos/customer.dto';
import { PageDto } from '@common/dtos/page.dto';

@ApiTags('Customers')
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Get(':id')
  @ApiOkResponse({ type: CustomerEntity })
  getCustomer(@Param() params: FindByIdDto): Promise<Customer> {
    return this.customerService.customer(params);
  }

  @Get()
  @ApiPaginatedResponse(CustomerEntity)
  async getCustomers(
    @Query() queryParams: GetCustomerDto
  ): Promise<PageDto<Customer>> {
    return this.customerService.customers(queryParams);
  }

  @Post()
  @ApiOkResponse({ type: CustomerEntity })
  async createCustomer(@Body() payload: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(payload);
  }

  @Put(':id')
  @ApiOkResponse({ type: CustomerEntity })
  updateCustomer(
    @Param() params: FindByIdDto,
    @Body() payload: UpdateCustomerDto
  ) {
    return this.customerService.update(params, payload);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CustomerEntity })
  removeCustomer(@Param() params: FindByIdDto) {
    return this.customerService.remove(params);
  }
}
