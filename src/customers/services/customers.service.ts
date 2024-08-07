import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Customer } from '@prisma/client';
import { GetCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { PageDto } from '@common/dtos/page.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async customer({ id }: FindByIdDto): Promise<Customer> {
    const customerData = await this.prisma.customer.findUnique({
      where: { id }
    });
    if (!customerData) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customerData;
  }
  async customers(params: GetCustomerDto): Promise<PageDto<Customer>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.customer.count();
    const data = await this.prisma.customer.findMany({ skip, take });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });
    return { data, meta: pageMetaDto };
  }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({
      data
    });
  }
  async update(
    params: FindByIdDto,
    data: UpdateCustomerDto
  ): Promise<Customer> {
    const { id } = params;
    await this.customer({ id });
    return this.prisma.customer.update({
      where: { id },
      data
    });
  }
  async remove({ id }: FindByIdDto): Promise<Customer> {
    await this.customer({ id });
    return this.prisma.customer.delete({
      where: { id }
    });
  }
}
