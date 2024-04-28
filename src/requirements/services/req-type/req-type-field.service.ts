import { PrismaService } from '@app/database/prisma.service';
import {
  CreateReqTypeFieldDto,
  UpdateReqTypeFieldDto
} from '@app/requirements/dtos/req-type-field.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReqTypeFieldService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateReqTypeFieldDto[]) {
    return await this.prisma.requirementTypeField.createMany({ data: payload });
  }

  async update(payload: UpdateReqTypeFieldDto[]) {
    for (const field of payload) {
      await this.prisma.requirementTypeField.update({
        where: { id: field.id },
        data: field
      });
    }
  }
}
