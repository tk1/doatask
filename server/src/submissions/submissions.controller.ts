import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request, UseGuards } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorators'
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller(['submissions', 'lti/submissions'])
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) { }

  @Post()
  @Roles('student')
  create(@Body() createSubmissionDto: CreateSubmissionDto, @Request() req) {
    return this.submissionsService.create(createSubmissionDto, req.res?.locals?.token);
  }

  @Get('runPublicCodeTests')
  @Roles('student')
  runPublicCodeTests(@Body() createSubmissionDto: CreateSubmissionDto){
    return this.submissionsService.runPublicCodeTests(createSubmissionDto);
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
