import {
  Column, Entity,
  PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToOne
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AssignmentTask } from '../assignmenttasks/assignmenttask.entity'
import { Submission } from '../submissions/submission.entity'
import { Domain } from '../domains/domain.entity'
import { User } from '../users/user.entity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  public: boolean;

  @Column({ nullable: true, type: "real" })
  rating: number;

  @Column("text", { array: true, default: '{}' })
  tags: string[];

  @Column({ nullable: true })
  plugin: string;

  @Column({ nullable: true, type: "json" })
  details: object;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => AssignmentTask, assignmentTask => assignmentTask.task)
  @ApiProperty({ type: Number })
  assignmentTasks: AssignmentTask[];

  @OneToMany(() => Submission, submission => submission.id)
  @ApiProperty({ type: Number })
  submissions: Submission[];

  @ManyToOne(() => Domain, domain => domain.tasks)
  @ApiProperty({ type: Number })
  domain: Domain;

  @ManyToOne(() => User)
  @ApiProperty({ type: Number })
  owner: User;
}
