import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentTask } from 'src/assignmenttasks/assignmenttask.entity';
import { AssignmentTasksService } from 'src/assignmenttasks/assignmenttasks.service';
import { Solution } from './solution.entity';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solution]),
    TypeOrmModule.forFeature([AssignmentTask])
  ],
  controllers: [SolutionsController],
  providers: [SolutionsService, AssignmentTasksService]
})
export class SolutionsModule { }
