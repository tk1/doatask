import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentTask } from './assignmenttask.entity';
import { AssignmentTasksService } from './assignmenttasks.service';
import { AssignmentTasksController } from './assignmenttasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentTask])],
  controllers: [AssignmentTasksController],
  providers: [AssignmentTasksService],
  exports: [AssignmentTasksService]
})
export class AssignmenttasksModule { }
