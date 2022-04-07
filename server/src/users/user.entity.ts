import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Submission } from '../submissions/submission.entity'
import { Solution } from 'src/solutions/solution.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  ltiid: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, select: false })
  password: string;

  @Column({ nullable: true, unique: true, select: false })
  email: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  origin: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Submission, submission => submission.id)
  @ApiProperty({ type: Number })
  submissions: Submission[];
}
