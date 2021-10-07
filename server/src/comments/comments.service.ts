import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './comment.entity'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>
  ) { }

  async create(createCommentDto: CreateCommentDto) {
    const comment = new Comment()
    Object.assign(comment, createCommentDto)
    return this.commentsRepository.save(comment)
  }

  async findAll(query: any) {
    const comments = await this.commentsRepository.find({ where: query, relations: ["owner"] })
    return comments
  }

  findOne(id: number) {
    return this.commentsRepository.findOne(id)
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const toUpdate = await this.commentsRepository.findOne(id)
    const updated = Object.assign(toUpdate, updateCommentDto)
    return this.commentsRepository.save(updated);
  }

  remove(id: number) {
    return this.commentsRepository.delete(id)
  }
}
