import { Test, TestingModule } from '@nestjs/testing';
import { SolutionsService } from './solutions.service';

describe('SolutionsService', () => {
  let service: SolutionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolutionsService],
    }).compile();

    service = module.get<SolutionsService>(SolutionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
