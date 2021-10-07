export class CreateTaskDto {
  title: string;
  description: string;
  public: boolean;
  plugin: string;
  details: any;
  domain: number;
  tags?: string[];
  rating?: number;
}
