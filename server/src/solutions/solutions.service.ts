import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { DeleteResult, Repository } from 'typeorm';
import { SolutionDto } from './dto/solution.dto';
import { Solution } from './solution.entity';

@Injectable()
export class SolutionsService {
    constructor(
        @InjectRepository(Solution)
        private readonly solutionsRepository: Repository<Solution>,
        private readonly userService: UsersService,
    ) { }

    async findAll(query: any) {

        let solutions = await this.solutionsRepository.find({ where: query })

        const results = await Promise.all(solutions.map(async s => {
            let solutionDto = new SolutionDto()
            Object.assign(solutionDto, s)
            solutionDto.user = await this.userService.findOne(s.userId)
            return solutionDto
        }))
        return results
    }

    findOne(userId: number, assignmentTaskId: number): Promise<Solution> {
        return this.solutionsRepository.findOne({ where: { userId: userId, assignmentTaskId: assignmentTaskId } });
    }

    create(createSolutionDto: SolutionDto): Promise<Solution> {
        const solution = new Solution();
        Object.assign(solution, createSolutionDto);
        return this.solutionsRepository.save(solution);
    }

    delete(userId: number, assignmentTaskId: number): Promise<DeleteResult> {
        return this.solutionsRepository.delete({ userId: userId, assignmentTaskId: assignmentTaskId })
    }
}