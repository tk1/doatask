import { Test, TestingModule } from '@nestjs/testing';
import { SolutionsController } from './solutions.controller';

describe('SolutionsController', () => {
  let controller: SolutionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolutionsController],
    }).compile();

    controller = module.get<SolutionsController>(SolutionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
