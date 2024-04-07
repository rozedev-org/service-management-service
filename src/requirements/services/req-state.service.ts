import { PrismaService } from '@app/database/prisma.service';
import { FindByIdDto } from '@app/dtos/generic.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { RequirementState } from '@prisma/client';
import {
  CreateReqStateDto,
  GetReqStatesDto,
  UpdateReqStateDto
} from '../dtos/req-state.dto';
import { PageMetaDto } from '@common/dtos/page-meta.dto';
import { PageDto } from '@common/dtos/page.dto';

@Injectable()
export class ReqStateService {
  constructor(private prisma: PrismaService) {}

  async reqState({ id }: FindByIdDto): Promise<RequirementState> {
    const reqState = await this.prisma.requirementState.findUnique({
      where: { id }
    });
    if (!reqState) {
      throw new NotFoundException(`Requirement state ${id} not found`);
    }
    return reqState;
  }

  async reqStates(params: GetReqStatesDto): Promise<PageDto<RequirementState>> {
    const { skip, take } = params;

    const itemCount = await this.prisma.requirementState.count();

    const data = await this.prisma.requirementState.findMany({
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

  async create(data: CreateReqStateDto): Promise<RequirementState> {
    const { title, secuence } = data;

    const existingReqStateTitle = await this.prisma.requirementState.findFirst({
      where: {
        title
      }
    });

    if (existingReqStateTitle) {
      throw new BadRequestException(
        `Requirement state with title ${title} already exists`
      );
    }

    const existingReqStateSecuence =
      await this.prisma.requirementState.findFirst({
        where: {
          secuence
        }
      });

    if (existingReqStateSecuence) {
      throw new BadRequestException(
        `Requirement state with secuence ${secuence} already exists`
      );
    }

    return this.prisma.requirementState.create({
      data
    });
  }

  async update(
    params: FindByIdDto,
    data: UpdateReqStateDto
  ): Promise<RequirementState> {
    await this.reqState(params);
    return this.prisma.requirementState.update({
      where: { id: params.id },
      data
    });
  }

  async remove({ id }: FindByIdDto): Promise<RequirementState> {
    await this.reqState({ id });
    return this.prisma.requirementState.delete({
      where: { id }
    });
  }
}
