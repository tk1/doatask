import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { SolutionDto } from './dto/solution.dto';
import { Solution } from './solution.entity';

@Injectable()
export class SolutionsService {
    constructor(
        @InjectRepository(Solution)
        private readonly solutionsRepository: Repository<Solution>,
    ) { }

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