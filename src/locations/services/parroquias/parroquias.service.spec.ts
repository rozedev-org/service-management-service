import { Test, TestingModule } from '@nestjs/testing';
import { ParroquiasService } from './parroquias.service';

describe('ParroquiasService', () => {
  let service: ParroquiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParroquiasService],
    }).compile();

    service = module.get<ParroquiasService>(ParroquiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
