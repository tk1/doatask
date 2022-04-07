import { User } from "src/users/user.entity";

export class SolutionDto {
    userId: number;
    assignmentTaskId: number;
    solution: any;
    taskId: number;
    assignmentId: number;
    user: User;
}