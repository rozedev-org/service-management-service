import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BoardService } from '../services/board.service';
import { BoardEntity } from '../entities/board.entity';
import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';

@ApiTags('board')
@UseGuards(JwtAuthGuard)
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOkResponse({ type: BoardEntity })
  async getBoard() {
    return this.boardService.getBoard();
  }
}
