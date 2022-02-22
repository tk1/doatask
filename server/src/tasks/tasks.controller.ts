import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorators'
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AssignmentTask } from 'src/assignmenttasks/assignmenttask.entity';
import { AssignmentTasksService } from 'src/assignmenttasks/assignmenttasks.service';


@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService, private readonly assignmentTasksService: AssignmentTasksService) { }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @Roles('teacher')
  findAll() {
    return this.tasksService.findAll({});
  }

  @Get('user/:id')
  @Roles('teacher')
  findUserAll(@Param('id') id: string) {
    return this.tasksService.findAll([{ owner: Number(id) }, { public: true }]);
  }

  @Get('student/:id')
  @Roles('student')
  findStudentAll(@Param('id') id: string) {
    return this.tasksService.findAll({}, false);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Get('/assignmentTask/:assignmentId')
  async findAllForAssignment(@Param('assignmentId') id: number) {
    let assignmentTasks = await this.assignmentTasksService.findAll({ assignmentId: id })
    return this.tasksService.findbyIds(assignmentTasks.map(assignmentTask => assignmentTask.taskId))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
