import { Test, TestingModule } from '@nestjs/testing';
import { ReqStateService } from './req-state.service';

describe('ReqStateService', () => {
  let service: ReqStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReqStateService]
    }).compile();

    service = module.get<ReqStateService>(ReqStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
