import {
  Column, CreateDateColumn, UpdateDateColumn,
  Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AssignmentTask } from '../assignmenttasks/assignmenttask.entity'
import { Submission } from '../submissions/submission.entity'
import { User } from '../users/user.entity'


@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  type: string;

  @Column({ default: false })
  public: boolean;

  @Column({ nullable: true, type: "timestamp" })
  dueDate: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => AssignmentTask, assignmentTask => assignmentTask.assignment)
  @ApiProperty({ type: Number })
  assignmentTasks: AssignmentTask[];

  @OneToMany(() => Submission, submission => submission.id)
  @ApiProperty({ type: Number })
  submissions: Submission[];

  @ManyToOne(() => User)
  @ApiProperty({ type: Number })
  owner: User;
}
