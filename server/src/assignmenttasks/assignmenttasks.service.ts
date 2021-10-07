import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignmentTaskDto } from './dto/create-assignmenttask.dto';
import { UpdateAssignmentTaskDto } from './dto/update-assignmenttask.dto';
import { AssignmentTask } from './assignmenttask.entity'


@Injectable()
export class AssignmentTasksService {
  constructor(
    @InjectRepository(AssignmentTask)
    private readonly assignmenttasksRepository: Repository<AssignmentTask>
  ) { }
  create(createAssignmenttaskDto: CreateAssignmentTaskDto) {
    const at = new AssignmentTask();
    Object.assign(at, createAssignmenttaskDto)

    return this.assignmenttasksRepository.save(at);
  }

  findAll(query: any) {
    return this.assignmenttasksRepository.find({ where: query })
  }

  findOne(id: number) {
    return this.assignmenttasksRepository.findOne(id)
  }

  async update(id: number, updateAssignmenttaskDto: UpdateAssignmentTaskDto) {
    const toUpdate = await this.assignmenttasksRepository.findOne(id)
    const updated = Object.assign(toUpdate, updateAssignmenttaskDto)
    return this.assignmenttasksRepository.save(updated);
  }

  remove(id: number) {
    return this.assignmenttasksRepository.delete(id);
  }
}
