import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  CreateReqTypeFieldDto,
  UpdateReqTypeFieldDto
} from '@app/requirements/dtos/req-type-field.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RequirementTypeField } from '@prisma/client';

@Injectable()
export class ReqTypeFieldService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves a requirement type field by its ID.
   *
   * @param {FindByIdDto} id - The ID of the requirement type field to retrieve.
   * @returns {Promise<RequirementTypeField>} The requirement type field data.
   * @throws {NotFoundException} If the requirement type field with the specified ID is not found.
   */
  async reqTypeField({ id }: FindByIdDto): Promise<RequirementTypeField> {
    const reqTypeFieldData = await this.prisma.requirementTypeField.findUnique({
      where: { id }
    });
    if (!reqTypeFieldData) {
      throw new NotFoundException(`Requirement type field ${id} not found`);
    }
    return reqTypeFieldData;
  }

  /**
   * Creates multiple requirement type fields.
   * @param payload - An array of objects representing the requirement type fields to be created.
   * @returns A promise that resolves to the created requirement type fields.
   */
  async create(payload: CreateReqTypeFieldDto[]) {
    return await this.prisma.requirementTypeField.createMany({ data: payload });
  }

  /**
   * Updates the requirement type fields based on the provided payload.
   * If a field has an `id`, it will be updated. Otherwise, a new field will be created.
   * @param payload - An array of `UpdateReqTypeFieldDto` objects representing the fields to be updated or created.
   */
  async update(payload: UpdateReqTypeFieldDto[]) {
    for (const field of payload) {
      if (field.id) {
        await this.prisma.requirementTypeField.update({
          where: { id: field.id },
          data: field
        });
      } else {
        await this.prisma.requirementTypeField.create({
          data: {
            title: field.title,
            type: field.type,
            requirementTypeId: field.requirementTypeId
          }
        });
      }
    }
  }

  /**
   * Removes a requirement type field by its ID.
   * @param {FindByIdDto} param - The ID of the requirement type field to be removed.
   * @returns {Promise<RequirementTypeField>} - A promise that resolves to the removed requirement type field.
   */
  async remove({ id }: FindByIdDto): Promise<RequirementTypeField> {
    await this.reqTypeField({ id });
    return this.prisma.requirementTypeField.delete({ where: { id } });
  }
}
