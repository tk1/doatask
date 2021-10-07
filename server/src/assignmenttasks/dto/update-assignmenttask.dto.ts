import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentTaskDto } from './create-assignmenttask.dto';

export class UpdateAssignmentTaskDto extends PartialType(CreateAssignmentTaskDto) { }
