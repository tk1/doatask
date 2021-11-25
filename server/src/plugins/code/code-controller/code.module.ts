import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [CodeController],
    providers: [TasksService, CodeService]
})
export class CodeModule {
}