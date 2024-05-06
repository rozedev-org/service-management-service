import { Test, TestingModule } from '@nestjs/testing';
import { ReqTypeFieldService } from './req-type-field.service';

describe('ReqTypeFieldService', () => {
  let service: ReqTypeFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReqTypeFieldService],
    }).compile();

    service = module.get<ReqTypeFieldService>(ReqTypeFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
