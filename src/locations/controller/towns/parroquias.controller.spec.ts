import { Test, TestingModule } from '@nestjs/testing';
import { ParroquiasController } from './parroquias.controller';

describe('ParroquiasController', () => {
  let controller: ParroquiasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParroquiasController],
    }).compile();

    controller = module.get<ParroquiasController>(ParroquiasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
