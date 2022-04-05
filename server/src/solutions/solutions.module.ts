import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentTask } from 'src/assignmenttasks/assignmenttask.entity';
import { AssignmentTasksService } from 'src/assignmenttasks/assignmenttasks.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Solution } from './solution.entity';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solution]),
    TypeOrmModule.forFeature([AssignmentTask]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [SolutionsController],
  providers: [SolutionsService, AssignmentTasksService, UsersService]
})
export class SolutionsModule { }
