import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorDefault } from '@common/interfaces/error.interface';

@ApiResponse({ status: '4XX', type: ErrorDefault })
@ApiResponse({ status: '5XX', type: ErrorDefault })
@ApiTags('Generic')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Get()
  async find() {
    return 'find';
  }
}
