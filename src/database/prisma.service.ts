import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    const defaultState = await this.requirementState.findUnique({
      where: {
        id: 1
      }
    });

    if (!defaultState) {
      await this.requirementState.create({
        data: {
          title: 'To do',
          secuence: 1
        }
      });
    }
  }
}
