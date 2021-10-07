import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';
// import { Task } from '../tasks/task.entity';
import { TasksModule } from '../tasks/tasks.module';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment]), TasksModule],
  controllers: [AssignmentsController],
  providers: [AssignmentsService]
})
export class AssignmentsModule { }
