import { Test, TestingModule } from '@nestjs/testing';
import { ReqTypeService } from './req-type.service';

describe('ReqTypeService', () => {
  let service: ReqTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReqTypeService],
    }).compile();

    service = module.get<ReqTypeService>(ReqTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
