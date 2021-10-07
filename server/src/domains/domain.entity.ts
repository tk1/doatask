import {
  Column, Entity,
  PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, OneToMany
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../tasks/task.entity'

@Entity()
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @OneToMany(() => Task, task => task.domain)
  @ApiProperty({ type: Number })
  tasks: Task[];
}
