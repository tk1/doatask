import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorators';
import { plugins } from 'src/plugins/list';
import { TasksService } from 'src/tasks/tasks.service';
import { TestDto } from './test.dto';

@Controller('tests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TestsController {

    constructor(
        private readonly tasksService: TasksService,
    ) { }

    @Post('runTests')
    @Roles('student')
    async runPublicCodeTests(@Body() testDto: TestDto): Promise<any> {
        const task = await this.tasksService.findOne(testDto.task)
        return await plugins.get(testDto.plugin.toLowerCase()).test(testDto.details, task)
    }
}