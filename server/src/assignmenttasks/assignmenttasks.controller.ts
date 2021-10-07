import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AssignmentTasksService } from './assignmenttasks.service';
import { CreateAssignmentTaskDto } from './dto/create-assignmenttask.dto';
import { UpdateAssignmentTaskDto } from './dto/update-assignmenttask.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('assignmenttasks')
@UseGuards(JwtAuthGuard)
export class AssignmentTasksController {
  constructor(private readonly assignmentTasksService: AssignmentTasksService) { }

  @Post()
  create(@Body() createAssignmenttaskDto: CreateAssignmentTaskDto) {
    return this.assignmentTasksService.create(createAssignmenttaskDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.assignmentTasksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentTasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignmenttaskDto: UpdateAssignmentTaskDto) {
    return this.assignmentTasksService.update(+id, updateAssignmenttaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentTasksService.remove(+id);
  }
}
