import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    Object.assign(task, createTaskDto)

    const savedTask = await this.tasksRepository.save(task);
    // include relations
    return this.findOne(savedTask.id)
  }

  async findAll(query: any, privateDetails = true): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({ where: query, relations: ["domain", "owner"] });
    if (!privateDetails) {
      for (const task of tasks) {
        const details: any = task.details
        if (details?.private) {
          delete details.private
        }
      }
    }
    return tasks
  }

  findOne(id: number) {
    return this.tasksRepository.findOne(id, { relations: ["domain", "owner"] });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const toUpdate = await this.tasksRepository.findOne(id)
    const updated = Object.assign(toUpdate, updateTaskDto)
    return this.tasksRepository.save(updated);
  }

  async updateRecord(record: Task) {
    return this.tasksRepository.save(record)
  }

  remove(id: number) {
    this.tasksRepository.delete(id)
  }
}
