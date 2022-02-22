import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Domain } from '../domains/domain.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DomainsService } from '../domains/domains.service'
import { AssignmentTask } from 'src/assignmenttasks/assignmenttask.entity';
import { AssignmentTasksService } from 'src/assignmenttasks/assignmenttasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([Domain]), TypeOrmModule.forFeature([AssignmentTask])],
  controllers: [TasksController],
  providers: [TasksService, DomainsService, AssignmentTasksService],
  exports: [TasksService]
})
export class TasksModule { }
