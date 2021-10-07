import {
  Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Task } from "../tasks/task.entity";
import { Assignment } from "../assignments/assignment.entity";
import { Submission } from '../submissions/submission.entity'

// https://typeorm.io/#/many-to-many-relations/many-to-many-relations-with-custom-properties

@Entity()
export class AssignmentTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column()
  weight: number;

  @Column({ nullable: true })
  timeLimit: number;

  @Column()
  taskId: number;

  @Column()
  assignmentId: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => Task, task => task.assignmentTasks)
  @ApiProperty({ type: Number })
  task: Task;

  @ManyToOne(() => Assignment, assignment => assignment.assignmentTasks)
  @ApiProperty({ type: Number })
  assignment: Assignment;

  @OneToMany(() => Submission, submission => submission.id)
  @ApiProperty({ type: Number })
  submissions: Submission[];
}
