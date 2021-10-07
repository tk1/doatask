import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentsRepository: Repository<Assignment>,
  ) { }

  async create(createAssignmentDto: CreateAssignmentDto) {
    const assignment = new Assignment();
    Object.assign(assignment, createAssignmentDto)

    const savedAssignement = await this.assignmentsRepository.save(assignment);
    // include relations
    return this.findOne(savedAssignement.id)
  }

  findAll(query: any) {
    return this.assignmentsRepository.find({ where: query, relations: ["assignmentTasks", "owner"] });
  }

  findOne(id: number) {
    return this.assignmentsRepository.findOne(id, { relations: ["assignmentTasks", "owner"] });
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const toUpdate = await this.assignmentsRepository.findOne(id)
    const updated = Object.assign(toUpdate, updateAssignmentDto)
    return this.assignmentsRepository.save(updated);
  }

  remove(id: number) {
    return this.assignmentsRepository.delete(id)
  }
}
