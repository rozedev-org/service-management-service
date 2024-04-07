import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BoardService } from '../services/board.service';
import { BoardEntity } from '../entities/board.entity';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOkResponse({ type: BoardEntity })
  async getBoard() {
    return this.boardService.getBoard();
  }
}
