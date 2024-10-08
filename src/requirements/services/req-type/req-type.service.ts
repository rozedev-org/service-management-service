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
import { ReqTypeFieldService } from './req-type-field.service';
import { CreateReqTypeFieldDto } from '@app/requirements/dtos/req-type-field.dto';
import {
  ReqTypeEntity,
  ReqTypeFieldEntity
} from '@app/requirements/entities/req-type.entity';

@Injectable()
export class ReqTypeService {
  constructor(
    private prisma: PrismaService,
    private reqTypeFieldService: ReqTypeFieldService
  ) {}

  /**
   * Retrieves a requirement type by its ID.
   * @param id - The ID of the requirement type.
   * @returns A Promise that resolves to the requirement type.
   * @throws NotFoundException if the requirement type with the specified ID is not found.
   */
  async reqType({ id }: FindByIdDto) {
    const reqTypeData = await this.prisma.requirementType.findUnique({
      where: { id },
      include: {
        requirementTypeField: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!reqTypeData) {
      throw new NotFoundException(`Requirement type ${id} not found`);
    }

    const formatedReqType = new ReqTypeEntity();
    formatedReqType.id = reqTypeData.id;
    formatedReqType.name = reqTypeData.name;
    formatedReqType.requirementTypeField = [];

    for await (const field of reqTypeData.requirementTypeField) {
      const formatedField = new ReqTypeFieldEntity();
      formatedField.id = field.id;
      formatedField.title = field.title;
      formatedField.type = field.type;
      formatedField.requirementTypeId = field.requirementTypeId;
      formatedField.order = field.order;
      formatedField.isOptional = field.isOptional;
      formatedField.isRequired = field.isRequired;

      if (field.type === 'user') {
        formatedField.options = await this.prisma.user.findMany();
      }
      if (field.type === 'customer') {
        formatedField.options = await this.prisma.customer.findMany();
      } else if (field.type === 'list') {
        formatedField.options = JSON.parse(field.options as string);
      }

      formatedReqType.requirementTypeField.push(formatedField);
    }

    return formatedReqType;
  }

  /**
   * Retrieves a paginated list of requirement types.
   *
   * @param params - The parameters for pagination (skip and take).
   * @returns A Promise that resolves to a PageDto containing the requirement types and pagination metadata.
   */
  async reqTypes(params: GetReqTypesDto): Promise<PageDto<ReqTypeEntity>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.requirementType.count();
    const data = await this.prisma.requirementType.findMany({
      include: {
        requirementTypeField: {
          orderBy: { order: 'asc' }
        }
      },
      skip,
      take
    });

    const formatedData = [];

    for await (const reqType of data) {
      const formatedReqTypeField = [];
      for await (const requirementTypeField of reqType.requirementTypeField) {
        const formatedField = new ReqTypeFieldEntity();
        formatedField.id = requirementTypeField.id;
        formatedField.title = requirementTypeField.title;
        formatedField.type = requirementTypeField.type;
        formatedField.requirementTypeId =
          requirementTypeField.requirementTypeId;
        formatedField.order = requirementTypeField.order;
        formatedField.isOptional = requirementTypeField.isOptional;
        formatedField.isRequired = requirementTypeField.isRequired;
        if (requirementTypeField.type === 'user') {
          formatedField.options = await this.prisma.user.findMany();
        }
        if (requirementTypeField.type === 'customer') {
          formatedField.options = await this.prisma.customer.findMany();
        } else if (requirementTypeField.type === 'list') {
          formatedField.options = JSON.parse(
            requirementTypeField.options as string
          );
        }
        formatedReqTypeField.push(formatedField);
      }
      formatedData.push({
        ...reqType,
        requirementTypeField: formatedReqTypeField
      });
    }

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto: params
    });

    return {
      data: formatedData,
      meta: pageMetaDto
    };
  }

  /**
   * Creates a new requirement type.
   * @param data - The data for the new requirement type.
   * @returns A Promise that resolves to the created requirement type.
   */
  async create(data: CreateReqTypeDto): Promise<ReqTypeEntity> {
    const reqType = await this.prisma.requirementType.create({
      data: { name: data.name }
    });

    const reqTypeFieldsPaylod: CreateReqTypeFieldDto[] =
      data.requirementTypeField.map((r) => ({
        requirementTypeId: reqType.id,
        title: r.title,
        type: r.type,
        order: r.order,
        isOptional: r.isOptional,
        options: r.options,
        isRequired: r.isRequired
      }));

    await this.reqTypeFieldService.create(reqTypeFieldsPaylod);
    return await this.reqType({ id: reqType.id });
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
  ): Promise<ReqTypeEntity> {
    const { id } = params;

    await this.reqType({ id });
    await this.prisma.requirementType.update({
      where: { id },
      data: { name: data.name }
    });

    if (data.requirementTypeField.length) {
      await this.reqTypeFieldService.update(data.requirementTypeField);
    }

    return await this.reqType({ id });
  }

  /**
   * Removes a requirement type by its ID.
   * @param {FindByIdDto} param - The ID of the requirement type to be removed.
   * @returns {Promise<RequirementType>} - A promise that resolves to the removed requirement type.
   */
  async remove({ id }: FindByIdDto): Promise<ReqTypeEntity> {
    await this.reqType({ id });
    return this.prisma.requirementType.delete({
      include: { requirementTypeField: true },
      where: { id }
    });
  }
}
