import { Module } from '@nestjs/common';
import { BoardService } from './services/board.service';
import { BoardController } from './controllers/board.controller';
import { PrismaModule } from '@app/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BoardService],
  controllers: [BoardController]
})
export class BoardModule {}
