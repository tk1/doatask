export class CreateSubmissionDto {
  course: string;
  plugin: string;
  solution: object;
  task: number;
  assignment: number;
  assignmentTask: number;
  user: number;
  level?: string;
  rated: boolean;
}
