import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Domain } from '../domains/domain.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DomainsService } from '../domains/domains.service'

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TypeOrmModule.forFeature([Domain])],
  controllers: [TasksController],
  providers: [TasksService, DomainsService],
  exports: [TasksService]
})
export class TasksModule { }
