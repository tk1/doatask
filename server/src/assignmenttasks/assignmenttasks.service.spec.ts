import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentTasksService } from './assignmenttasks.service';

describe('AssignmenttasksService', () => {
  let service: AssignmentTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignmentTasksService],
    }).compile();

    service = module.get<AssignmentTasksService>(AssignmentTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
