import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateReqTypeDto,
  GetReqTypesDto,
  UpdateReqTypeDto
} from '@app/requirements/dtos/req-type.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RequirementType } from '@prisma/client';

@Injectable()
export class ReqTypeService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves a requirement type by its ID.
   * @param id - The ID of the requirement type.
   * @returns A Promise that resolves to the requirement type.
   * @throws NotFoundException if the requirement type with the specified ID is not found.
   */
  async reqType({ id }: FindByIdDto): Promise<RequirementType> {
    const reqTypeData = await this.prisma.requirementType.findUnique({
      where: { id }
    });
    if (!reqTypeData) {
      throw new NotFoundException(`Requirement type ${id} not found`);
    }
    return reqTypeData;
  }

  /**
   * Retrieves a paginated list of requirement types.
   *
   * @param params - The parameters for pagination (skip and take).
   * @returns A Promise that resolves to a PageDto containing the requirement types and pagination metadata.
   */
  async reqTypes(params: GetReqTypesDto): Promise<PageDto<RequirementType>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.requirementType.count();
    const data = await this.prisma.requirementType.findMany({
      skip,
      take
    });
    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });

    return {
      data,
      meta: pageMetaDto
    };
  }

  /**
   * Creates a new requirement type.
   * @param data - The data for the new requirement type.
   * @returns A Promise that resolves to the created requirement type.
   */
  async create(data: CreateReqTypeDto): Promise<RequirementType> {
    return this.prisma.requirementType.create({
      data
    });
  }

  /**
   * Updates a requirement type.
   *
   * @param params - The parameters for finding the requirement type.
   * @param data - The data to update the requirement type with.
   * @returns A Promise that resolves to the updated requirement type.
   */
  async update(
    params: FindByIdDto,
    data: UpdateReqTypeDto
  ): Promise<RequirementType> {
    const { id } = params;

    await this.reqType({ id });
    return this.prisma.requirementType.update({
      where: { id },
      data
    });
  }

  /**
   * Removes a requirement type by its ID.
   * @param {FindByIdDto} param - The ID of the requirement type to be removed.
   * @returns {Promise<RequirementType>} - A promise that resolves to the removed requirement type.
   */
  async remove({ id }: FindByIdDto): Promise<RequirementType> {
    await this.reqType({ id });
    return this.prisma.requirementType.delete({
      where: { id }
    });
  }
}
