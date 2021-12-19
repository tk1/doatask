import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { TestsController } from './tests.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [TestsController],
    providers: [TasksService]
})
export class TestsModule {
}