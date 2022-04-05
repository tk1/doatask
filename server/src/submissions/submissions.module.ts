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
import { SolutionsService } from 'src/solutions/solutions.service';
import { Solution } from 'src/solutions/solution.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    LtiModule,
    TypeOrmModule.forFeature([Submission]),
    TypeOrmModule.forFeature([Task]),
    TypeOrmModule.forFeature([Rating]),
    TypeOrmModule.forFeature([Assignment]),
    TypeOrmModule.forFeature([AssignmentTask]),
    TypeOrmModule.forFeature([Solution]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, TasksService, RatingsService, AssignmentsService, AssignmentTasksService, SolutionsService, UsersService],
  exports: []
})
export class SubmissionsModule { }
