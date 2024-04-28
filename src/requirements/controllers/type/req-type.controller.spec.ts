import { Test, TestingModule } from '@nestjs/testing';
import { ReqTypeController } from './req-type.controller';

describe('ReqTypeController', () => {
  let controller: ReqTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReqTypeController],
    }).compile();

    controller = module.get<ReqTypeController>(ReqTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
