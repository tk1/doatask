import {
  Column, Entity,
  PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToOne
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Task } from '../tasks/task.entity';
import { AssignmentTask } from '../assignmenttasks/assignmenttask.entity'
import { Assignment } from '../assignments/assignment.entity'

export type levelType = 'task' | 'assignment'

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  course: string;

  @Column({ nullable: true })
  plugin: string;

  @Column({ nullable: true, type: "json" })
  solution: object;

  @Column({ nullable: true, type: "real" })
  grade: number;

  @Column({ nullable: true, type: "json" })
  feedback: object;

  @Column({ default: true })
  rated: boolean;

  @Column({ nullable: true, type: "real" })
  rating: number;

  @Column({ type: "enum", enum: ['task', 'assignment'], default: 'task' })
  level: levelType;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => Task, task => task.submissions)
  @ApiProperty({ type: Number })
  task: Task;

  @ManyToOne(() => AssignmentTask, assignmentTask => assignmentTask.submissions)
  @ApiProperty({ type: Number })
  assignmentTask: AssignmentTask;

  @ManyToOne(() => Assignment, assignment => assignment.submissions)
  @ApiProperty({ type: Number })
  assignment: AssignmentTask;

  @ManyToOne(() => User, user => user.submissions)
  @ApiProperty({ type: Number })
  user: User;
}
