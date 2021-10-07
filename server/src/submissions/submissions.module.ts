import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './submission.entity'
import { Task } from '../tasks/task.entity'
import { Rating } from '../ratings/rating.entity'
import { Assignment } from '../assignments/assignment.entity'
import { AssignmentTask } from 'src/assignmenttasks/assignmenttask.entity';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { TasksService } from '../tasks/tasks.service';
import { RatingsService } from '../ratings/ratings.service'
import { AssignmentsService } from '../assignments/assignments.service';
import { AssignmentTasksService } from '../assignmenttasks/assignmenttasks.service';
import { LtiModule } from '../lti/lti.module';

@Module({
  imports: [
    LtiModule,
    TypeOrmModule.forFeature([Submission]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Rating]),
    TypeOrmModule.forFeature([Assignment]),
    TypeOrmModule.forFeature([AssignmentTask])
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, TasksService, RatingsService, AssignmentsService, AssignmentTasksService]
})
export class SubmissionsModule { }
