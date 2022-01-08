import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorators'
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SolutionsService } from 'src/solutions/solutions.service';

@Controller(['submissions', 'lti/submissions'])
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly solutionsService: SolutionsService) { }

  @Post()
  @Roles('student')
  async create(@Body() createSubmissionDto: CreateSubmissionDto, @Request() req) {
    let submission = await this.submissionsService.create(createSubmissionDto, req.res?.locals?.token);
    this.solutionsService.delete(createSubmissionDto.user, createSubmissionDto.assignmentTask);
    return submission;
  }

  @Get()
  findAll(@Query() query) {
    return this.submissionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionsService.update(+id, updateSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(+id);
  }
}
