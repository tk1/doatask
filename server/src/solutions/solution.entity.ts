import {
    Column, Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
} from 'typeorm';

@Entity()
export class Solution {

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    assignmentTaskId: number;

    @Column({ nullable: false, type: "json" })
    solution: any;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
