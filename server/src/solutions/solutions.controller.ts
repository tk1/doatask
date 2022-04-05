import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Put, Post, Query } from '@nestjs/common';
import { AssignmentTasksService } from 'src/assignmenttasks/assignmenttasks.service';
import { Roles } from 'src/common/decorators/roles.decorators';
import { SolutionDto } from './dto/solution.dto';
import { Solution } from './solution.entity';
import { SolutionsService } from './solutions.service';

@Controller('solutions')
export class SolutionsController {
    constructor(private readonly solutionsService: SolutionsService,
        private readonly assignmentTasksService: AssignmentTasksService) { }

    @Get(':userId/:assignmentTaskId')
    @Roles('student')
    findOne(@Param('userId') userId: number, @Param('assignmentTaskId') assignmentTaskId: number): Promise<Solution> {
        return this.solutionsService.findOne(userId, assignmentTaskId);
    }

    @Get()
    async findAll(@Query() query) {
        return await this.solutionsService.findAll(query);
    }

    @Post()
    @Roles('student')
    async create(@Body() createSolutionDto: SolutionDto): Promise<Solution> {
        await this.checkIfTimeLimitIsSet(createSolutionDto.assignmentTaskId);
        await this.checkIfTaskIsSavable(createSolutionDto.assignmentTaskId);
        return this.solutionsService.create(createSolutionDto);
    }

    private async checkIfTimeLimitIsSet(assignmentTaskId: number) {
        if ((await this.assignmentTasksService.findOne(assignmentTaskId)).timeLimit != null) {
            throw new ForbiddenException("You cannot create an intermediate solution for an assignment task with a time limit");
        }
    }

    private async checkIfTaskIsSavable(assignmentTaskId: number) {
        const assignmentTask = await this.assignmentTasksService.findOne(assignmentTaskId);
        if (assignmentTask != null) {
            //if (!assignmentTask.task.savable) {
            //    throw new ForbiddenException("A task with the savable flag set to false cannot have intermediate solutions");
            // }
        } else {
            throw new NotFoundException(`Assignment task with id ${assignmentTaskId} not found`, assignmentTaskId.toString());
        }
    }

    @Delete(':userId/:assignmentTaskId')
    @Roles('student')
    delete(@Param('userId') userId: number, @Param('assignmentTaskId') assignmentTaskId: number) {
        return this.solutionsService.delete(userId, assignmentTaskId);
    }
}