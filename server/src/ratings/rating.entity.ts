import {
  Column, CreateDateColumn, UpdateDateColumn,
  Entity, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Domain } from '../domains/domain.entity'

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  ownerid: number;

  @Column({ type: "real" })
  value: number;

  @Column({ type: "real" })
  deviation: number;

  @Column({ type: "real" })
  volatility: number;

  @Column({ type: "real" })
  result: number;

  @Column()
  latest: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToOne(() => Domain)
  @ApiProperty({ type: Number })
  domain: Domain;
}
