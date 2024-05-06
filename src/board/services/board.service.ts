import { PrismaService } from '@app/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async getBoard() {
    const data = await this.prisma.requirementState.findMany({
      include: {
        requirement: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        secuence: 'asc'
      }
    });

    return data;
  }
}
