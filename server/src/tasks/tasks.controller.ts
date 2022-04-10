import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorators'
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AssignmentTask } from 'src/assignmenttasks/assignmenttask.entity';
import { AssignmentTasksService } from 'src/assignmenttasks/assignmenttasks.service';
import { BaseExceptionFilter } from '@nestjs/core';
import { RatingsService } from 'src/ratings/ratings.service';


@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService,
    private readonly assignmentTasksService: AssignmentTasksService,
    private readonly ratingService: RatingsService) { }

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
    return this.tasksService.findAll({ owner: Number(id), public: false });
  }

  @Get('student/:id')
  @Roles('student')
  findStudentAll(@Param('id') id: string) {
    return this.tasksService.findAll({ isActive: true }, false);
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
  async remove(@Param('id') id: string) {
    if ((await this.assignmentTasksService.findAll({ taskId: +id })).length === 0) {
      this.tasksService.remove(+id)
    } else {
      throw new BadRequestException('The task cannot be deleted because it is currently in an assignment')
    }
  }

  @Get('/isInAssignment/:id')
  async isInAssignment(@Param('id') id: string): Promise<boolean> {
    return (await this.assignmentTasksService.findAll({ taskId: +id })).length > 0
  }
}
