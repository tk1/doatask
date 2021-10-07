import {
  Column, Entity,
  PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, ManyToOne
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity'
import { Task } from '../tasks/task.entity'



@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ default: 1 })
  stars: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => User)
  @ApiProperty({ type: Number })
  owner: User;

  @ManyToOne(() => Task)
  @ApiProperty({ type: Number })
  task: Task;
}
