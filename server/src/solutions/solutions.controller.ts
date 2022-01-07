import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorators';
import { SolutionDto } from './dto/solution.dto';
import { Solution } from './solution.entity';
import { SolutionsService } from './solutions.service';

@Controller('solutions')
export class SolutionsController {
    constructor(private readonly solutionsService: SolutionsService) { }

    @Get(':userId/:assignmentTaskId')
    @Roles('student')
    findOne(@Param('userId') userId: number, @Param('assignmentTaskId') assignmentTaskId: number): Promise<Solution> {
        return this.solutionsService.findOne(userId, assignmentTaskId);
    }

    @Put()
    @Roles('student')
    create(@Body() createSolutionDto: SolutionDto): Promise<Solution> {
        return this.solutionsService.create(createSolutionDto);
    }

    @Delete(':userId/:assignmentTaskId')
    @Roles('student')
    delete(@Param('userId') userId: number, @Param('assignmentTaskId') assignmentTaskId: number) {
        return this.solutionsService.delete(userId, assignmentTaskId);
    }
}