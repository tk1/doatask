import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentTasksController } from './assignmenttasks.controller';
import { AssignmentTasksService } from './assignmenttasks.service';

describe('AssignmenttasksController', () => {
  let controller: AssignmentTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignmentTasksController],
      providers: [AssignmentTasksService],
    }).compile();

    controller = module.get<AssignmentTasksController>(AssignmentTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
