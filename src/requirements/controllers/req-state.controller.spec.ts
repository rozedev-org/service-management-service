import { Test, TestingModule } from '@nestjs/testing';
import { ReqStateController } from './req-state.controller';

describe('ReqStateController', () => {
  let controller: ReqStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReqStateController],
    }).compile();

    controller = module.get<ReqStateController>(ReqStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
