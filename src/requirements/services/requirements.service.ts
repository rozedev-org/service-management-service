import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Requirement } from '@prisma/client';
import {
  CreateRequirementsDto,
  GetRequirementsDto,
  UpdateRequirementsDto
} from '../dtos/requirements.dto';
import { PageDto } from '@common/dtos/page.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { UsersService } from '@app/users/services/users.service';
import {
  ReqActionsEntity,
  RequirementEntity
} from '../entities/requirements.entity';
import { use } from 'passport';

@Injectable()
export class RequirementsService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService
  ) {}

  async requirement({ id }: FindByIdDto): Promise<RequirementEntity> {
    const requirementData = await this.prisma.requirement.findUnique({
      where: { id },
      include: {
        user: true,
        requirementFieldValue: {
          include: {
            requirementTypeField: true
          }
        }
      }
    });
    if (!requirementData) {
      throw new NotFoundException(`Requirement ${id} not found`);
    }
    return requirementData;
  }

  async requirements(
    params: GetRequirementsDto
  ): Promise<PageDto<Requirement>> {
    const { skip, take } = params;
    const itemCount = await this.prisma.requirement.count();
    const data = await this.prisma.requirement.findMany({
      skip,
      take,
      include: {
        user: true
      }
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

  async create(data: CreateRequirementsDto): Promise<Requirement> {
    data.userId && (await this.userService.user({ id: data.userId }));
    const newRequirement = await this.prisma.requirement.create({
      data: {
        stateId: data.stateId,
        requirementTypeId: data.requirementTypeId,
        userId: data.userId
      }
    });

    const reqFieldValue = data.requirementFieldValue.map((fieldValue) => ({
      ...fieldValue,
      requirementId: newRequirement.id
    }));
    await this.prisma.requirementFieldValue.createMany({
      data: reqFieldValue
    });
    const requirement = await this.requirement({ id: newRequirement.id });
    // return this.prisma.requirement.create({
    //   data
    // });
    const requiredFieldErrors = requirement.requirementFieldValue
      .filter((fieldValue) => !fieldValue.requirementTypeField.isOptional)
      .map((fieldValue) => {
        if (!fieldValue.value) {
          return `Required field ${fieldValue.requirementTypeField.title} is missing a value.`;
        }
        return null;
      })
      .filter((error) => error !== null);

    if (requiredFieldErrors.length > 0) {
      throw new Error(requiredFieldErrors.join(' '));
    }
    return requirement;
  }

  async update(params: FindByIdDto, data: UpdateRequirementsDto) {
    const { id } = params;

    data.userId && (await this.userService.user({ id: data.userId }));

    await this.requirement({ id });

    const newRequirementData = {
      stateId: data.stateId,
      userId: data.userId
    };

    await this.prisma.requirement.update({
      where: { id },
      data: newRequirementData
    });

    if (data.requirementFieldValue) {
      for await (const fieldValue of data.requirementFieldValue) {
        await this.prisma.requirementFieldValue.update({
          where: { id: fieldValue.id },
          data: { value: fieldValue.value }
        });
      }
    }

    return await this.requirement({ id });
  }

  async remove({ id }: FindByIdDto): Promise<Requirement> {
    await this.requirement({ id });
    return this.prisma.requirement.delete({
      where: { id }
    });
  }

  async getReqActions(params: FindByIdDto): Promise<ReqActionsEntity> {
    const req = await this.requirement(params);

    const reqStates = await this.prisma.requirementState.findMany({
      orderBy: {
        secuence: 'asc'
      }
    });

    const currenState = reqStates.find((state) => state.id === req.stateId);

    const remainingStates = reqStates.filter(
      (state) => state.id !== currenState.id
    );

    return {
      current: currenState,
      remaining: remainingStates
    };
  }
}
